import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavigationBar from './common/NavigationBar';
import Dashboard from './Dashboard';
import Manage from './Manage';

const Index = (props) => {
    return (
        <Router>
            <NavigationBar/>
            <Route exact path="/" render={() => <Dashboard  currentUser={props.currentUser}/>}/>
            <Route exact path="/manager/manage" render={() => <Manage/>}/>
        </Router>
    )
}

export default Index;