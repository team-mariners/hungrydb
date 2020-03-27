import React from 'react';
import Summary from './dashboard/Summary';
import Stats from './Stats';

const Dashboard = (props) => {
    console.log(props);
    return (
        <div className="p-3">
            <h1>Hello {props.info.manager.username}!</h1>
            <Stats/>
       </div>
    )
}

export default Dashboard;