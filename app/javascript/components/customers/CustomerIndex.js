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
        this.resetFoods = this.resetFoods.bind(this);
        this.state = { orders: JSON.parse(sessionStorage.getItem('foods')) };
    }

    // State passed upward from FoodModal through MenuItem & Menu to this
    handleSubmitOrder(newFood, picture) {
        let updatedOrders = this.state.orders === null ? {} : this.state.orders;
        if (newFood.f_name in updatedOrders) {
            updatedOrders[newFood.f_name]["quantity"] =
                parseInt(updatedOrders[newFood.f_name]["quantity"]) +
                parseInt(newFood.quantity);
        } else {
            updatedOrders[newFood.f_name] = {};
            updatedOrders[newFood.f_name]["picture"] = picture;
            updatedOrders[newFood.f_name]["price"] = newFood.price;
            updatedOrders[newFood.f_name]["quantity"] = newFood.quantity;
            updatedOrders[newFood.f_name]["id"] = newFood.id;
        }
        console.log(updatedOrders);

        this.setState({ orders: updatedOrders });
        // Persist order info in local browser storage
        sessionStorage.setItem('foods', JSON.stringify(updatedOrders));
        console.log(sessionStorage.getItem('foods'));
    }

    resetFoods() {
        this.setState({ orders: JSON.parse(sessionStorage.getItem('foods')) });
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
                    render={() => <Restaurants onResetOrder={this.resetFoods} />} />

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
