import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavigationBar from './common/NavigationBar';
import Dashboard from './Dashboard';
import Manage from './Manage';
import Orders from './Orders';
import Stats from './Stats';
import Reviews from './Reviews';

const Index = (props) => {
    console.log(props);
    return (
        <Router>
            <NavigationBar/>
            <Route exact path="/" render={() => <Dashboard  currentUser={props.currentManager}/>}/>
            <Route exact path="/manager/orders" render={() => <Orders/>}/>
            <Route exact path="/manager/stats" render={() => <Stats/>}/>
            <Route exact path="/manager/reviews" render={() => <Reviews/>}/>
            <Route exact path="/manager/manage" render={() => <Manage/>}/>
        </Router>
    )
};

export default Index;