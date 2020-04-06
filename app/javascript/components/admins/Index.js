import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Dashboard from './Dashboard';
import NavBar from './NavBar';
import Promotions from './Promotions';
import Roles from './Roles';
import Schedule from './Schedule';
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
            <Route exact path="/admin/promotions">
                <Promotions
                    allPromos={props.allPromos}
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
            <Route path="/admin/schedule">
                <Schedule
                    userid={props.params.rid}
                    username={props.riderUsername}
                    partTimeSchedule={props.partTimeSchedule}
                    fullTimeSchedule={props.fullTimeSchedule}
                    riderSchedule={props.riderSchedule}
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
