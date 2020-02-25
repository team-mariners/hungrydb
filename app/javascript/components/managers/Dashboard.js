import React from 'react';
import Summary from './dashboard/Summary';

const Dashboard = (props) => {
    return (
        <React.Fragment>
            <h2>Hello {props.currentUser.username}!</h2>
            <Summary/>
       </React.Fragment>
    )
}

export default Dashboard;