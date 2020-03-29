import React from 'react';
import OrdersStats from './OrdersStats';

const Dashboard = (props) => {
    return (
        <div className="p-3">
            <h1>Hello {props.info.manager.username}!</h1>
            <OrdersStats/>
       </div>
    )
}

export default Dashboard;