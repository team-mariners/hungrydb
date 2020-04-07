import React from 'react';
import Table from 'react-bootstrap/Table';

/**
 * Copied from admin/Schedule.js
 * @param {*} props 
 * schedule: a 2D array containing the information about the rider's schedule
 */
const WorkSchedule = (props) => {    
    let schedule = [];

    // If the rider schedule is not empty, transpose the given rider schedule matrix
    if (!!props.riderSchedule && props.riderSchedule.length !== 0) {
        schedule = props.riderSchedule[0].map((col, i) => props.riderSchedule.map(row => row[i]));
    } else {        
        // Else, initialise the schedule with an empty schedule
        for (let i = 0; i < 12; i++) {
            schedule[i] = [];
            for (let j = 0; j < 7; j++) {
                schedule[i].push(0);
            }
        }
    }

    const dow = [
        "",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    const tableHeaders = dow.map((day) => {
        return (<th key={day}>{day}</th>);
    })

    const intervals = [];
    for (var i = 10; i < 22; i++) {
        var leftHour = (i % 12) || 12;
        var leftAmPm = i < 12 ? "AM" : "PM";
        var rightHour = ((i + 1) % 12) || 12;
        var rightAmPm = (i + 1) < 12 ? "AM" : "PM";
        intervals.push(leftHour + leftAmPm + " - " + rightHour + rightAmPm);
    }

    const intervalValues = intervals.map((val, i) => {
        return (
            <tr key={i}>
                <td>{val}</td>
                {schedule[i].map((val, j) => {
                    const value = (val == 0) ? '' : 'Active';
                    return (<td key={(i + 1) * j}>{value}</td>);
                })}
            </tr>
        );
    });

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {tableHeaders}
                </tr>
            </thead>
            <tbody>
                {intervalValues}
            </tbody>
        </Table>
    );
};

export default WorkSchedule;