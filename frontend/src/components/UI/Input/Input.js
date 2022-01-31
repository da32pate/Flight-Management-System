import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
	let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

	switch (props.elementType) {
		case "input":
			inputElement = (
				<input
					{...props.elementConfig}
					className={inputClasses.join(" ")}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case "textarea":
			inputElement = (
				<textarea
					{...props.elementConfig}
					className={inputClasses.join(" ")}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
        case "date":
            inputElement = (
                <input 
                    className={inputClasses.join(" ")}
                    type="date"
                    onInput={props.changed}
                    defaultValue={new Date().toISOString().substring(0, 10)}
                />
            );
            break;
        case "number":
            inputElement = (
                <input 
                    type="number" 
                    className={inputClasses.join(" ")}
                    onInput={props.changed}
                    min={0}
                    defaultValue={1}
                />
            );
            break;
		default:
			inputElement = (
				<input
					{...props.config}
					className={inputClasses.join(" ")}
					value={props.value}
					onChange={props.changed}
				/>
			);
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.Label}</label>
			{inputElement}
		</div>
	);
};

export default Input;
