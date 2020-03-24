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
import CompleteOrder from './ordersubmission/CompleteOrder';

class Index extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.handleRecordAmountDue = this.handleRecordAmountDue.bind(this);
        this.resetOrders = this.resetOrders.bind(this);
        this.state = { orders: JSON.parse(sessionStorage.getItem('orders')) };
    }

    // State passed upward from FoodModal through MenuItem & Menu to this
    handleSubmitOrder(newOrder, picture) {
        let updatedOrders = this.state.orders === null ? {} : this.state.orders;
        if (newOrder.f_name in updatedOrders) {
            updatedOrders[newOrder.f_name]["quantity"] =
                parseInt(updatedOrders[newOrder.f_name]["quantity"]) +
                parseInt(newOrder.quantity);
        } else {
            updatedOrders[newOrder.f_name] = {};
            updatedOrders[newOrder.f_name]["picture"] = picture;
            updatedOrders[newOrder.f_name]["price"] = newOrder.price;
            updatedOrders[newOrder.f_name]["quantity"] = newOrder.quantity;
        }
        console.log(updatedOrders);

        this.setState({ orders: updatedOrders });
        // Persist order info in local browser storage
        sessionStorage.setItem('orders', JSON.stringify(updatedOrders));
        console.log(sessionStorage.getItem('orders'));
    }

    resetOrders() {
        this.setState({ orders: JSON.parse(sessionStorage.getItem('orders')) });
    }

    handleRecordAmountDue(latestAmount) {
        sessionStorage.setItem('amount_due', latestAmount);
    }

    render() {
        return (
            <Router>
                <CustomerNavBar />
                {/* <h6>{JSON.stringify(props.info)}</h6> */}
                <Route exact path="/" render={() => <Dashboard currentUser={this.props.info} />} />

                <Route exact path="/customer/order"
                    render={() => <Restaurants onResetOrders={this.resetOrders} />} />

                <Route exact path={ "/customer/order/:rid/menu" }>
                    <Menu onSubmitOrder={this.handleSubmitOrder} />
                </Route>

                <Route exact path="/restaurants/:rid/reviews" render={() => <RestaurantReviews/>} />
                
                <Route exact path="/customer/cart">
                    <Cart orders={this.state.orders} points={this.props.info.points}
                            onAmountDueSubmit={this.handleRecordAmountDue} />
                </Route>
                <Route exact path="/customer/complete-order"
                    render={() => <CompleteOrder/> } />

                <Route exact path="/customer/history" render={() => <OrderHistory />} />
                <Route exact path="/customer/reviews" render={() => <ReviewHistory />} />
                <Route exact path="/customer/promotions" render={() => <PromosPage />} />
            </Router>
        )
    }
}

export default Index;
