# coding: utf-8

# In[11]:
import requests
from requests_html import HTMLSession
import unittest
from unittest.mock import patch
import nest_asyncio
import re
#source = "YYZ"
#destination = "DEL"
#date = "03/07/2022"
#person="1"
class Travel:
    def __init__( self , source, destination, date, person):
        self.source = source
        self.destination = destination
        self.date = date
        self.person = person
        
    def url_validity(self):
        url = "https://www.aircanada.com/ca/en/aco/home/app.html#/search?org1="+self.source+"&dest1="+self.destination+"&orgType1=A&destType1=A&departure1="+self.date+"&marketCode=INT&numberOfAdults="+self.person+"&numberOfYouth=0&numberOfChildren=0&numberOfInfants=0&numberOfInfantsOnSeat=0&tripType=O&isFlexible=false"
        nest_asyncio.apply()
        
        session = HTMLSession()
        #print(session.get(url))
        try:
             r = session.get(url)
        except:
            return 'Bad Response!'
        #print(r)

        if r.ok:
            return 'positive response'
        else:
            return 'Bad Response!'


class TestAirCanada(unittest.TestCase):
    
    def setUp(self):
        print('setUp')
        self.travel1 = Travel("YYZ", "DEL", "03/07/2022", "1")
        self.travel2 = Travel("YYC", "BOM", "02/30/2022", "1")
        self.travel3 = Travel("AMD", "YWG", "03/07/2022", "1")
        self.travel4 = Travel("YOW", "BLR", "03/07/2022", "1")        

    def tearDown(self):
        print('tearDown\n')
            
    def test_url_validity(self):
        print('test_url_validity')
        #print(self.travel1.url_validity())
        self.assertEqual(self.travel1.url_validity(), 'positive response')
        
        
    def test_date_check(self):
        print('test_date_check')
        #print(self.travel2.url_validity())
        
        self.assertEqual(self.travel2.url_validity(), 'positive response')
        
        
        def test_response_type(self):

        temp = requests.get('http://127.0.0.1:5000/site_open' , json = 
         {

                "source" : "YYZ",
                "destination" : "DEL",
                "date" : "03/07/2022",
                "person": "1"
         })
        self.assertGreater( len(temp.json()),0 )

    def test_response_type_wrong(self):

        temp = requests.get('http://127.0.0.1:5000/site_open' , json = 
         {

                "source" : "YYZ36",
                "destination" : "DEL",
                "date" : "03/07/2022",
                "person": "1"
         })
        
        self.assertEqual( temp.status_code , 500)
        
        
    def test_response_type_sorted(self):

        temp = requests.get('http://127.0.0.1:5000/site_open' , json = 
         {

                "source" : "YYZ",
                "destination" : "DEL",
                "date" : "03/07/2022",
                "person": "1"
         })
        
        self.assertLess( list(map(int, re.findall(r'\d+', temp.json()[0]['Economy_Class'])))[0] ,  list(map(int, re.findall(r'\d+', temp.json()[-1]['Economy_Class'])))[0] )
if __name__ == '__main__':
    unittest.main() 

        
        
