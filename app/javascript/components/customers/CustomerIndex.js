import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CustomerNavBar from './CustomerNavBar';
import Dashboard from './dashboard/CustomerDashboard';
// import Manage from './Manage';
// import Orders from './Orders';
// import Stats from './Stats';
// import Reviews from './Reviews';
// import ManageMenu from './ManageMenu';
// import ManagePromo from './ManagePromo';
// import ManageInfo from './ManageInfo';

const Index = (props) => {
    console.log(props);
    return (
        <Router>
            <CustomerNavBar/>
            <h3>{JSON.stringify(props.info)}</h3>
            <Route exact path="/" render={() => <Dashboard currentUser={props.info}/>}/>
            {/* <Route exact path="/customer/orders" render={() => <CustomerOrders />}/>
            <Route exact path="/customer/reviews" render={() => <CustomerReviews />}/>
            <Route exact path="/customer/promotions" render={() => <CustomerPromos />}/>*/}
        </Router>
    )
};

export default Index;