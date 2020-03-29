import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Dashboard from './Dashboard';
import NavBar from './NavBar';
import Roles from './Roles';
import Statistics from './Statistics';

const Index = (props) => {
    return (
        <Router>
            <NavBar />
            <Route exact path="/">
                <Dashboard
                    currentUser={props.currentUser}
                    roleAttributes={props.roleAttributes}
                />
            </Route>
            <Route path="/admin/roles">
                <Roles
                    currentUser={props.currentUser}
                    userid={props.params.id}
                    username={props.rolesUsername}
                    userrole={props.rolesUserrole}
                    rolesAvailable={props.rolesAvailable}
                    existingRestaurant={props.existingRestaurant}
                />
            </Route>
            <Route exact path="/admin/statistics">
                <Statistics
                    statistics={props.statistics}
                />
            </Route>
        </Router>
    )
}

export default Index;
