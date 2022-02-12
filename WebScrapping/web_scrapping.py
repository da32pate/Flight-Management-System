# importing the lib
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import pandas as pd
import numpy
import time
import sys
from selenium.webdriver.chrome.service import service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import flask
from flask import request

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/site_open', methods=['GET'])
def site_open():
    print(request.data, file=sys.stderr)
    request_data = request.get_json()
    source = request_data['source']
    destination =request_data['destination']
    date = request_data['date']
    person = request_data['person']
    url = "https://www.aircanada.com/ca/en/aco/home/app.html#/search?org1="+source+"&dest1="+destination+"&orgType1=A&destType1=A&departure1="+date+"&marketCode=INT&numberOfAdults="+person+"&numberOfYouth=0&numberOfChildren=0&numberOfInfants=0&numberOfInfantsOnSeat=0&tripType=O&isFlexible=false"
    economy_list=[]
    economy_desc=[]
    premium_list=[]
    premium_desc=[]
    executive_list=[]
    executive_desc=[]
    economy_price=[]
    premium_price=[]
    executive_price=[]
    count = 0
    final=[]
    no= 0
    count1= 0;count2=0;count3=0
    eco_dis=[]
    pre_dis=[]
    exe_dis=[]
    #opening the site using selenium
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.maximize_window()
    driver.get(url)
    time.sleep(15)


    #clicking the price button and sorting the value by price
    price_button = "//div[@id='sortByPrice']"
    driver.find_element_by_xpath("//div[@id='sortByPrice']").click()
    
    
    #getting the price list

    price_list = driver.find_elements_by_xpath("//div[@class='display-on-hover']")
    for i in range(len(price_list)):
        price_list[i]=price_list[i].get_attribute('innerHTML')


        
    for values in range(0,100):
        try:
            if driver.find_element_by_xpath("//span[@id='recommendation_ECO_"+str(values)+"']"):
                economy_list.append(values)
                a= driver.find_element_by_xpath("//span[@id='recommendation_ECO_"+str(values)+"']").get_attribute("innerHTML")
                economy_desc.append(a)
                a = price_list[count]
    #             print("eco values",values)
    #             print("eco count",count)
                economy_price.append(a)
                count = count +1

        except:
            pass




        try:
            if driver.find_element_by_xpath("//span[@id='recommendation_PREM_"+str(values)+"']"):
                premium_list.append(values)
                b= driver.find_element_by_xpath("//span[@id='recommendation_PREM_"+str(values)+"']").get_attribute("innerHTML")
                premium_desc.append(b)
                a = price_list[count]
    #             print("prem values ",values)
    #             print("prem count",count)
                count = count +1
                premium_price.append(a)
        except:
            pass



        try:
            if driver.find_element_by_xpath("//span[@id='recommendation_EXEC_"+str(values)+"']"):
                executive_list.append(values)
                c= driver.find_element_by_xpath("//span[@id='recommendation_EXEC_"+str(values)+"']").get_attribute("innerHTML")
                executive_desc.append(c)
                a = price_list[count]
    #             print("exe values",values)
    #             print("exe count",count)
                count = count +1

                executive_price.append(a)
        except:
            pass





    final.extend(economy_list)
    final.extend(premium_list)
    final.extend(executive_list)
    final.sort()
    final =list(set(final))

    
    

    for val in final:
        if val in economy_list:
            eco_dis.append(economy_price[count1])
            count1 =count1 +1
        else:
            eco_dis.append(None)




        if val in premium_list:
            pre_dis.append(premium_price[count2])
            count2 =count2 +1
        else:
            pre_dis.append(None)




        if val in executive_list:
            exe_dis.append(executive_price[count3])
            count3 =count3 +1
        else:
            exe_dis.append(None)


        no = no+1 
        
        
        
    departure_time = driver.find_elements_by_xpath("//div[@class='itinerary-depart-time depart-time']")
    arrival_time = driver.find_elements_by_xpath("//div[@class='itinerary-arrival-time arrival-time']")
    for i in range(len(departure_time)):
        departure_time[i]=departure_time[i].get_attribute('innerHTML')
        arrival_time[i] = arrival_time[i].get_attribute('innerHTML')



    for val in range(len(departure_time)):
        departure_time[val] = departure_time[val][7:12]


    for val in range(len(arrival_time)):
        arrival_time[val] = arrival_time[val][7:12]

    print(type(arrival_time),type(departure_time),type(pre_dis),len(eco_dis),len(exe_dis))
    
    
    df = pd.DataFrame(list(zip(arrival_time,departure_time,eco_dis,pre_dis,exe_dis)),columns=  ['Arrival_Time','Departure_Time','Economy_Class','Premium_Class','Business_Class'])

    df["To"]=destination
    df["From"]=source
    df  =df[['From','To','Departure_Time','Arrival_Time','Economy_Class','Premium_Class','Business_Class']]

    return df.to_json(orient='records')


app.run()


