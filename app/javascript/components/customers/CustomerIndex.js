import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CustomerNavBar from './CustomerNavBar'
import Dashboard from './dashboard/CustomerDashboard'
import OrderHistory from './orderhistory/OrderHistory'
import ReviewHistory from './reviews/ReviewHistory'
import PromosPage from './promotions/PromosPage'

const Index = (props) => {
    console.log(props);
    return (
        <Router>
            <CustomerNavBar/>
            {/* <h6>{JSON.stringify(props.info)}</h6> */}
            <Route exact path="/" render={() => <Dashboard currentUser={props.info}/>}/>
            <Route exact path="/customer/history" render={() => <OrderHistory />}/>
            <Route exact path="/customer/reviews" render={() => <ReviewHistory />}/>
            <Route exact path="/customer/promotions" render={() => <PromosPage />}/>
        </Router>
    )
}

export default Index
