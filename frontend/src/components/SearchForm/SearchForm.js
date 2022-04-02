import React, { useState } from "react";
import classes from "./SearchForm.module.css";

import Input from "../UI/Input/Input";
import axiosInstance from "../../axios";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/spinner";
import Table from "../UI/Table/Table";
import Moment from "moment";

const AIRPORTS = [
	{
		india: [
			{ value: "DEL", displayValue: "DEL - Delhi" },
			{ value: "BOM", displayValue: "BOM - Mumbai" },
			{ value: "MAA", displayValue: "MAA - Chennai" },
			{ value: "BLR", displayValue: "BLR - Banglore" },
			{ value: "COK", displayValue: "COK - Kochi" },
			{ value: "HYD", displayValue: "HYD - Hyderabad" },
			{ value: "CCU", displayValue: "CCU - Kolkata" },
			{ value: "AMD", displayValue: "AMD - Ahmedabad" },
			{ value: "IXC", displayValue: "IXC - Chandigarh" },
		],
		canada: [
			{ value: "YYC", displayValue: "YYC - Calgary" },
			{ value: "YYZ", displayValue: "YYZ - Toronto" },
			{ value: "YVR", displayValue: "YVR - Vancover" },
			{ value: "YWG", displayValue: "YWG - Winnipeg" },
			{ value: "YQB", displayValue: "YQB - Quebec" },
			{ value: "YHZ", displayValue: "YHZ - Nova Scotia" },
			{ value: "YOW", displayValue: "YOW - Ottawa" },
		],
	},
];

const SearchForm = (props) => {
	const [state, setState] = useState({
		orderForm: {
			origin: {
				elementType: "select",
				elementConfig: {
					options: AIRPORTS,
				},
				value: "DEL",
			},
			destination: {
				elementType: "select",
				elementConfig: {
					options: AIRPORTS,
				},
				value: "YYZ",
			},
			date: {
				elementType: "date",
				value: new Date().toISOString().substring(0, 10),
			},
			number: {
				elementType: "number",
				value: 1,
			},
		},
		loading: false,
	});

	const [data, setData] = useState();

	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////

	const inputChangedHandler = (event, formElementIdentifier) => {
		// clone all input elements
		const updatedOrderForm = {
			...state.orderForm,
		};

		// clone the properties inside THIS input-element
		const updatedFormElement = {
			...updatedOrderForm[formElementIdentifier],
		};

		// Update THIS input-element's fields (if it's not dropdown)
		updatedFormElement.value = event.target.value;

		// Updated form for THIS input-element gets the updated input-element
		updatedOrderForm[formElementIdentifier] = updatedFormElement;

		setState({ orderForm: updatedOrderForm });
	};

	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////

	const submitHandler = (event) => {
		event.preventDefault();

		let payload = {
			source: state.orderForm.origin.value,
			destination: state.orderForm.destination.value,
			date: Moment(state.orderForm.date.value).format("YYYY-MM-DD"),
			person: state.orderForm.number.value,
		};
        

		setState({ ...state, loading: true });

		axiosInstance.post("/site_open", payload).then((res) => {
			setState({ ...state, loading: false });
			setData(res.data);
		});
	};

	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////

	// create an array from the state
	const formElementsArray = [];
	for (let key in state.orderForm) {
		formElementsArray.push({
			id: key,
			config: state.orderForm[key],
		});
	}

	let table = <></>;
	if (data && data.length > 0) {
		table = <Table flights={data} />;
	}

	// create a form with Input elements using info from the above array
	let form = (
		<form onSubmit={submitHandler}>
			{formElementsArray.map((formElement) => {
				return (
					<Input
						key={formElement.id}
						changed={(event) => {
							inputChangedHandler(event, formElement.id);
						}}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
					/>
				);
			})}
			<Button>SEARCH</Button>
		</form>
	);

	if (state.loading) form = <Spinner />;

	return (
		<>
			<div className={classes.SearchForm}>
				<h4>Flights</h4>
				{form}
			</div>
			{table}
		</>
	);
};

export default SearchForm;
