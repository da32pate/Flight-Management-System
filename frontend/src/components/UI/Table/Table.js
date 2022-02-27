import React from "react";
import classes from "./Table.module.css";

const Table = ({ flights }) => {

	let rows = flights.map((flight, idx) => {
		return (
			<tr key={idx}>
				<td>{flight.From ? flight.From : "-"}</td>
				<td>{flight.To ? flight.To : "-"}</td>
				<td>{flight.Arrival_Time ? flight.Arrival_Time : "-"}</td>
				<td>{flight.Departure_Time ? flight.Departure_Time : "-"}</td>
				<td>{flight.Economy_Class ? flight.Economy_Class : "-"}</td>
				<td>{flight.Premium_Class ? flight.Premium_Class : "-"}</td>
				<td>{flight.Business_Class ? flight.Business_Class : "-"}</td>
			</tr>
		);
	});

	return (
		<table className={classes.Table}>
			<thead>
				<tr>
					<th>From</th>
					<th>To</th>
					<th>Departure</th>
					<th>Arrival</th>
					<th>Economy</th>
					<th>Premium</th>
					<th>Business</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
};

export default Table;
