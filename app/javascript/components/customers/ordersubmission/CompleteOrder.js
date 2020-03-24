import React from 'react';
import Button from 'react-bootstrap/Button';
import AddressBox from './AddressBox';
import PaymentMethod from './PaymentMethod';
import axios from 'axios';

class CompleteOrder extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePaymentChange = this.handlePaymentChange.bind(this);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.state = {address: "", paymentMethod: "cash" };
    }

    handleAddressChange(entered) {
        // Typeahead in handleAddress returns object with value
        // under label key if new selection entered
        if (typeof entered == "object") {
            entered = entered.label;
        }
        this.setState({address: entered});
        console.log(entered);
    }

    handlePaymentChange(e) {
        this.setState({paymentMethod: e.target.value.toLowerCase()});
        console.log(e.target.value.toLowerCase());
    }

    handleSubmitOrder(e) {
        if (!this.state.address) {
            alert("Address cannot be empty!");
            e.preventDefault();
            return;
        }

        let order = {};
        order["promo_ids"] = JSON.parse(sessionStorage.getItem('used_promo_ids'));
        order["restaurant_id"] = parseInt(sessionStorage.getItem('restaurant_id'));
        order["point_offset"] = parseInt(sessionStorage.getItem('points'));
        order["payment_method"] = this.state.paymentMethod;
        order["delivery_fee"] = 3.00
        order["total_price"] = sessionStorage.getItem('amount_due');
        order["status"] = "in progress";
        order["foods"] = JSON.parse(sessionStorage.getItem('orders'));
        order["customer_location"] = this.state.address;
        axios.post('/orders', order)
            .then((result) => {         
                console.log(result);
                sessionStorage.clear();
            }).catch((error) => {
                console.log(error);
                alert("Failed to place order!");
            })
    }

    render() {
        return (
            <div className="order-submission-container">
                <h2>Please key in your address</h2>
                <h6>Click on "New selection" in the dropdown after typing a new address</h6>
                <br/>
                <AddressBox onChangeAddress={this.handleAddressChange} />
                <br/><br/><br/><br/>

                <h2>Amount Due: ${parseFloat(sessionStorage.getItem('amount_due')).toFixed(2)}</h2>
                <PaymentMethod onChangeMethod={this.handlePaymentChange} />
                <br/><br/>

                <Button style={{display: "block", width: 200, margin: "auto"}}
                        href="/" variant="primary" size="lg"
                        onClick={this.handleSubmitOrder}>
                    CONFIRM
                </Button>
                <br/>
            </div>
        )
    }
}

export default CompleteOrder;
