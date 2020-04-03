import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './NavBar';
import Dashboard from './Dashboard';

const Profile = (props) => {
    return (
        <Router>
            <NavBar role={props.role} />
            <Route exact path="/profile">
                <Dashboard
                    currentUser={props.currentUser}
                    role={props.userrole}
                    roleAttributes={props.roleAttributes}
                />
            </Route>
        </Router>
    );
};

export default Profile;
