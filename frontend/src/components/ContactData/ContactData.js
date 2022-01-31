import React, { useState } from "react";
import classes from "./ContactData.module.css";

import Input from "../UI/Input/Input";
// import axios from "../../../axios-orders";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/spinner";

const ContactData = () => {
	const [state, setState] = useState({
		orderForm: {
			origin: {
				elementType: "input",
				elementConfig: {
					type: "origin",
					placeholder: "Origin Airport",
				},
				value: "",
				touched: false,
				valid: false,
				validation: {
					required: true,
				},
			},
			destination: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Destination Airport",
				},
				value: "",
				touched: false,
				valid: false,
				validation: {
					required: true,
				},
			},
			date: {
				elementType: "date",
				// value: "",
				touched: false,
				valid: false,
				validation: {
					required: true,
				},
			},
			number: {
				elementType: "number",
                elementConfig: {},
				touched: false,
				valid: false,
				validation: {
					required: true,
				},
			},
		},
		loading: false,
		formIsValid: false,
	});

	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////

	const checkValidity = (value, rules) => {
		let isValid = true;

		// if no rules are defined, return valid as true
		if (!rules) return isValid;

		// if the element has a required property
		if (rules.required) {
			// if it has a true-ish value (trim ensures non empty/white-space string)
			isValid = value.trim() !== "" && isValid;
		}

		// if element satisfies minimum length
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		// if element satisfies maximum length
		if (rules.minLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	};

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
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;

		// Updated form for THIS input-element gets the updated input-element
		updatedOrderForm[formElementIdentifier] = updatedFormElement;

		// Check if ALL input fields in the form are valid
		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid =
				updatedOrderForm[inputIdentifier].valid && formIsValid;
		}

		setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid,
		});
	};

	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////

	const orderHandler = (event) => {
		event.preventDefault();
		setState({ loading: true });

		const formData = {};
		for (let formElementIdentifier in state.orderForm) {
			formData[formElementIdentifier] =
				state.orderForm[formElementIdentifier].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			orderData: formData,
		};

		// axios
		// 	.post("/orders.json", order)
		// 	.then((res) => {
		// 		setState({ loading: false });
		// 		this.props.history.push("/");
		// 	})
		// 	.catch((error) => {
		// 		setState({ loading: false });
		// 		console.log(error);
		// 	});
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

	// create a form with Input elements using info from the above array
	let form = (
		<form onSubmit={orderHandler}>
			{formElementsArray.map((formElement) => {
				return (
					<Input
						key={formElement.id}
						changed={(event) => {
							this.inputChangedHandler(event, formElement.id);
						}}
						shouldValidate={formElement.config.validation}
						invalid={!formElement.config.valid}
						touched={formElement.config.touched}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
					/>
				);
			})}
			<Button btnType='Success' disabled={!state.formIsValid}>
				Search
			</Button>
		</form>
	);

	if (state.loading) {
		form = <Spinner />;
	}

	return (
		<div className={classes.ContactData}>
			<h4>Enter your contact data</h4>
			{form}
		</div>
	);
};

export default ContactData;
