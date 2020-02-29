import React from 'react';
import CustomerSummary from './CustomerSummary';
import CustomerBenefits from './CustomerBenefits';

const Dashboard = (props) => {
    return (
        <div id='customer-dashboard-container'>
            <CustomerSummary currentUser={props.currentUser} />
            <CustomerBenefits currentUser={props.currentUser} />
        </div>
    )
}

export default Dashboard;
