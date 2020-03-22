import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CustomerNavBar from './CustomerNavBar'
import Dashboard from './dashboard/CustomerDashboard';
import Menu from './order/Menu';
import Cart from './cart/Cart';
import OrderHistory from './orderhistory/OrderHistory';
import ReviewHistory from './reviews/ReviewHistory';
import PromosPage from './promotions/PromosPage';
import Restaurants from './order/Restaurants';
import RestaurantReviews from './order/RestaurantReviews';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.state = { orders: JSON.parse(localStorage.getItem('orders')) };
    }

    // State passed upward from FoodModal through MenuItem & Menu to this
    handleSubmitOrder(newOrder) {
        let updatedOrders = this.state.orders === null ? {} : this.state.orders;
        if (newOrder.f_name in updatedOrders) {
            updatedOrders[newOrder.f_name]["quantity"] =
                parseInt(updatedOrders[newOrder.f_name]["quantity"]) +
                parseInt(newOrder.quantity);
        } else {
            updatedOrders[newOrder.f_name] = {};
            updatedOrders[newOrder.f_name]["price"] = newOrder.price;
            updatedOrders[newOrder.f_name]["quantity"] = newOrder.quantity;
        }
        console.log(updatedOrders);

        this.setState({ orders: updatedOrders });
        // Persist order info in local browser storage
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        console.log(localStorage.getItem('orders'));
    }

    render() {
        return (
            <Router>
                <CustomerNavBar />
                {/* <h6>{JSON.stringify(props.info)}</h6> */}
                <Route exact path="/" render={() => <Dashboard currentUser={this.props.info} />} />

                <Route exact path="/customer/order" render={() => <Restaurants />} />

                <Route exact path={ "/customer/order/:rid/menu" }>
                    <Menu onSubmitOrder={this.handleSubmitOrder} />
                </Route>

                <Route exact path="/restaurants/:rid/reviews" render={() => <RestaurantReviews/>} />
                
                <Route exact path="/customer/cart" render={() => <Cart orders={this.state.orders} />} />
                <Route exact path="/customer/history" render={() => <OrderHistory />} />
                <Route exact path="/customer/reviews" render={() => <ReviewHistory />} />
                <Route exact path="/customer/promotions" render={() => <PromosPage />} />
            </Router>
        )
    }
}

export default Index;
