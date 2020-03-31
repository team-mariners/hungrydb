import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RiderNaviBar from './common/RiderNaviBar';
import DashBoard from './DashBoard';

const csrfToken = document.querySelector('[name=csrf-token').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
const Index = (props) => {
    return (
        <Router>
            <RiderNaviBar/>        
            <Switch>
                <Route exact path="/" render={() => <DashBoard {...props}/>}/>
            </Switch> 
            <Switch>
                <Route exact path="/RiderStatistics">
                    <RiderStatistics riderStatistics ={props.riderStatistics} />
                </Route>
            </Switch>           
        </Router>
    )
};

export default Index;