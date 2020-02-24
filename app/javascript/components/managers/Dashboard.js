import React from 'react';
import NavigationBar from './common/NavigationBar';

const Dashboard = (props) => {
    return (
        <React.Fragment>
            <NavigationBar/>
            <h2>Hello {props.currentUser.username}!</h2>
        </React.Fragment>
    )
}

export default Dashboard;