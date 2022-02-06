import React from "react";
import classes from "./Table.module.css";

const Table = ({ flights }) => {

	let rows = flights.map((flight, idx) => {
		return (
			<tr key={idx}>
                <td>{flight.Airlines ? flight.Airlines : "-"}</td>
				<td>{flight.Source ? flight.Source : "-"}</td>
				<td>{flight.Destination ? flight.Destination : "-"}</td>
                <td>{flight.Date ? flight.Date : "-"}</td>
				<td>{flight.Arrival_time ? flight.Arrival_time : "-"}</td>
				<td>{flight.Departure_time ? flight.Departure_time : "-"}</td>
				<td>{flight.CAD ? flight.CAD : "-"}</td>
                <td>{flight.Stops ? flight.Stops : "-"}</td>
                <td>{flight.Duration ? flight.Duration : "-"}</td>
			</tr>
		);
	});

	return (
		<table className={classes.Table}>
			<thead>
				<tr>
                    <th>Airlines</th>
					<th>Source</th>
					<th>Destination</th>
                    <th>Date</th>
					<th>Departure Time</th>
					<th>Arrival Time</th>
                    <th>Stops</th>
                    <th>Duration</th>
					<th>CAD</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
};

export default Table;
