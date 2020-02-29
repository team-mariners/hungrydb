import React from 'react';
import CustomerSummary from './CustomerSummary';

const Dashboard = (props) => {
    return (
        <React.Fragment>
            <CustomerSummary currentUser={props.currentUser} />
       </React.Fragment>
    )
}

export default Dashboard;