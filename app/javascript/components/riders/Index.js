import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RiderNaviBar from './common/RiderNaviBar';
import DashBoard from './DashBoard';
import ManageDeliveries from './ManageDeliveries';

const csrfToken = document.querySelector('[name=csrf-token').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
const Index = (props) => {
    return (
        <Router>
            <RiderNaviBar/>        
            <Switch>
                <Route exact path="/" render={() => <DashBoard {...props}/>}/>
                <Route exact path="/rider/deliveries" render={() => <ManageDeliveries/>}/>
            </Switch>            
        </Router>
    )
};

export default Index;