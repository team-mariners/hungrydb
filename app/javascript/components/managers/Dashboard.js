import React from 'react';
import OrdersSummary from './OrdersSummary';

const Dashboard = (props) => {
    return (
        <div className="p-3">
            <h1>Hello {props.info.manager.username}!</h1>
            <OrdersSummary/>
       </div>
    )
}

export default Dashboard;