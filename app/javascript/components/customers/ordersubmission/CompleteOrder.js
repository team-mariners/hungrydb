import React from 'react';
import Button from 'react-bootstrap/Button';
import AddressBox from './AddressBox';
import PaymentMethod from './PaymentMethod';
import axios from 'axios';
import secureStorage from '../../utilities/HungrySecureStorage';

class CompleteOrder extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePaymentChange = this.handlePaymentChange.bind(this);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.state = { address: "", paymentMethod: "cash", resMenu: {} };
    }

    componentDidMount() {
        axios.get("/api/v1/restaurants/" + secureStorage.getItem('restaurant_id') + '/menu.json')
            .then(
                (response) => {
                    let retrievedFoods = response.data.menu;
                    this.setState({ resMenu: retrievedFoods });
                    console.log(this.state.resMenu);
                })
            .catch(error => {
                console.log(error);
            })
    }

    handleAddressChange(entered) {
        // Typeahead in handleAddress returns object with value
        // under label key if new selection entered
        if (typeof entered == "object") {
            entered = entered.label;
        }
        this.setState({ address: entered });
        console.log(entered);
    }

    handlePaymentChange(e) {
        this.setState({ paymentMethod: e.target.value.toLowerCase() });
        console.log(e.target.value.toLowerCase());
    }

    handleSubmitOrder(e) {
        if (!this.state.address) {
            alert("Address cannot be empty!");
            e.preventDefault();
            return;
        }

        if (!this.checkAllFoodActive()) {
            e.preventDefault();
            return;
        }

        if (!confirm("Confirm Submit Order?")) {
            e.preventDefault();
            return;
        }

        // In case user tampers with sessionStorage amountDue
        if (!secureStorage.getItem('amount_due')) {
            alert("An error has occurred. Please go back to cart and try to order again.");
            return;
        }

        let order = {};
        order["promo_id"] = secureStorage.getItem('used_promo_id')
            ? JSON.parse(secureStorage.getItem('used_promo_id'))
            : "null";
        order["restaurant_id"] = parseInt(secureStorage.getItem('restaurant_id'));
        order["point_offset"] = secureStorage.getItem('points_offset')
            ? parseFloat(secureStorage.getItem('points_offset'))
            : 0;
        order["payment_method"] = this.state.paymentMethod;
        order["delivery_fee"] = secureStorage.getItem('delivery_fee');
        order["total_price"] = parseFloat(secureStorage.getItem('total_price'));
        order["status"] = "in progress";
        order["foods"] = JSON.parse(secureStorage.getItem('foods'));
        order["customer_location"] = this.state.address;
        axios.post('/order', order)
            .then((result) => {
                console.log(result);
                alert("Your order has been placed." + "\nYou used "
                    + parseInt(secureStorage.getItem('points_offset') * 10) + " and earned "
                    + Math.floor(secureStorage.getItem('amount_due')) + " points!");
            }).catch((error) => {
                console.log(error);
                alert("Failed to place order!");
            })
    }

    checkAllFoodActive() {
        // Check if all the ordered food is still active (exists in menu.json)
        // Only active foods were queried by SQL & sent to menu.json
        let menu = this.state.resMenu;
        let menuArray = [];
        for (let section in menu) {
            for (let food of menu[section]) {
                menuArray.push(food.f_name);
            }
        }
        console.log(menuArray);

        let orderedFoods = JSON.parse(secureStorage.getItem("foods"));
        console.log(orderedFoods);
        for (let food in orderedFoods) {
            if (!menuArray.includes(food)) {
                alert(food + " is no longer available");
                return false;
            }
        }
        return true;
    }

    render() {
        if (!secureStorage.getItem('restaurant_id') ||
            !secureStorage.getItem('amount_due') ||
            !secureStorage.getItem('foods') ||
            !secureStorage.getItem('total_price')) {
            { secureStorage.clear() }
            return <h3>An error has occurred. Please place your order again.</h3>
        }

        return (
            <div className="order-submission-container">
                <h2>Please key in your address</h2>
                <h6>Click on "New selection" in the dropdown after typing a new address</h6>
                <br />
                <AddressBox onChangeAddress={this.handleAddressChange} />
                <br /><br /><br /><br />

                <h2>Amount Due: ${parseFloat(secureStorage.getItem('amount_due')).toFixed(2)}</h2>
                <PaymentMethod onChangeMethod={this.handlePaymentChange} />
                <br /><br />

                <Button style={{ display: "block", width: 200, margin: "auto" }}
                    href="/customer/review_order" variant="primary" size="lg"
                    onClick={this.handleSubmitOrder}>
                    CONFIRM
                </Button>
                <br />
            </div>
        )
    }
}

export default CompleteOrder;
