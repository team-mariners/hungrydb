import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CustomerNavBar from './CustomerNavBar'
import Dashboard from './dashboard/CustomerDashboard';
import Menu from './order/Menu';
import OrderHistory from './orderhistory/OrderHistory';
import ReviewHistory from './reviews/ReviewHistory';
import PromosPage from './promotions/PromosPage';
import Restaurants from './order/Restaurants';
import RestaurantReviews from './order/RestaurantReviews';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.handleChooseRestaurant = this.handleChooseRestaurant.bind(this);
        this.state = { chosen_restaurant: null };
    }

    // State passed upward from RestaurantSelection to Restaurants to this
    handleChooseRestaurant(restaurant) {
        this.setState({ chosen_restaurant: restaurant });
    }

    render() {
        return (
            <Router>
                <CustomerNavBar />
                {/* <h6>{JSON.stringify(props.info)}</h6> */}
                <Route exact path="/" render={() => <Dashboard currentUser={this.props.info} />} />

                <Route exact path="/customer/order"
                    render={() => <Restaurants onChooseRestaurant={ this.handleChooseRestaurant }/>} />

                <Route exact path={ "/customer/order/:rid/menu" }>
                    <Menu restaurant_id={this.state.chosen_restaurant}/>
                </Route>

                <Route exact path="/restaurants/:rid/reviews" render={() => <RestaurantReviews/>} />
                
                <Route exact path="/customer/history" render={() => <OrderHistory />} />
                <Route exact path="/customer/reviews" render={() => <ReviewHistory />} />
                <Route exact path="/customer/promotions" render={() => <PromosPage />} />
            </Router>
        )
    }
}

export default Index;
