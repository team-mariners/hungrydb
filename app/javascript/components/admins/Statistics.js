import React from 'react';

const Statistics = (props) => {
    return (
        <React.Fragment>
            <h2>Statistics on HungryDB</h2>
            <p>This page provides some statistics on the HungryDB instance.</p>
            <h3>Users</h3>
            <ul>
                <li>Total number of users: {props.statistics.numUsers}</li>
                <li>Number of admins: {props.statistics.numAdmins}</li>
                <li>Number of managers: {props.statistics.numManagers}</li>
                <li>Number of riders: {props.statistics.numRiders}</li>
                <li>Number of customers: {props.statistics.numCustomers}</li>
            </ul>
            <h3>Restaurants</h3>
            <ul>
                <li>Number of restaurants: {props.statistics.numRestaurants}</li>
                <li>Number of food items: {props.statistics.numFood}</li>
            </ul>
        </React.Fragment>
    )
}

export default Statistics;
