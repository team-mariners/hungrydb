import React from 'react';

const RiderStatistics = (props) => {
    return (
        <React.Fragment>
            <h2>Rider's Statistics on HungryDB</h2>
            <p>This page provides your statistics as a rider of HungryDB.</p>
            <h3>Your Statistics Summary</h3>
            <ul>
                <li>Total number of orders this week: {props.riderStatistics.numWeeklyOrder}</li>
                <li>Total number of orders this month: {props.riderStatistics.numMonthlyOrder}</li>
                <li>Total number of orders since joined: {props.riderStatistics.numTotalOrder}</li>
                <li>Total number of hours worked this week: {props.riderStatistics.numWeeklyHoursWorked}</li>
                <li>Total number of hours worked this month: {props.riderStatistics.numMonthlyHoursWorked}</li>
                <li>Total comission from orders this week: ${props.riderStatistics.totalWeeklyComission}</li>
                <li>Total comission from orders this month: ${props.riderStatistics.totalMonthlyComission}</li>
                <li>Your weekly/monthly base salary: ${props.riderStatistics.baseSalary}</li>
            </ul>
        </React.Fragment>
    )
}

export default RiderStatistics;
