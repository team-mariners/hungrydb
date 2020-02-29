import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CustomerNavBar from './CustomerNavBar'
import Dashboard from './dashboard/CustomerDashboard'

const Index = (props) => {
    console.log(props);
    return (
        <Router>
            <CustomerNavBar/>
            <h6>{JSON.stringify(props.info)}</h6>
            <Route exact path="/" render={() => <Dashboard currentUser={props.info}/>}/>
            {/* <Route exact path="/customer/orders" render={() => <CustomerOrders />}/>
            <Route exact path="/customer/reviews" render={() => <CustomerReviews />}/>
            <Route exact path="/customer/promotions" render={() => <CustomerPromos />}/>*/}
        </Router>
    )
}

export default Index