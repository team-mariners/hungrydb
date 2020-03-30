import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RiderNaviBar from './common/RiderNaviBar';
import DashBoard from './DashBoard';

const Index = (props) => {
    return (
        <Router>
            <RiderNaviBar/>        
            <Switch>
                <Route exact path="/" render={() => <DashBoard {...props}/>}/>
            </Switch>            
        </Router>
    )
};

export default Index;