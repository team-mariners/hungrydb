import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Restaurants from './Restaurants';
import Menu from './Menu';
import axios from 'axios';

class OrderPage extends React.Component {
    constructor(props) {
        super(props)
        this.handleChooseRestaurant = this.handleChooseRestaurant.bind(this)
        this.state = { chosen_restaurant: null }
    }

    // State passed from RestaurantSelection to Restaurant to this


    render() {
        return (
            <Router>
                {/* <h1>{this.state.chosen_restaurant}</h1> */}
                <Route exact path="/customer/order"
                    render={() => <Restaurants onChooseRestaurant={ this.handleChooseRestaurant }/>} />
                <Route exact path={ "/customer/order/" + this.state.chosen_restaurant + "/menu" }
                    render={() => <Menu restaurant_id={ this.state.chosen_restaurant }/>} />
            </Router>
        )
    }
}

export default OrderPage
