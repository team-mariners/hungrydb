import React from 'react';
import Button from 'react-bootstrap/Button';
import AddressBox from './AddressBox';
import PaymentMethod from './PaymentMethod';

class CompleteOrder extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePaymentChange = this.handlePaymentChange.bind(this);
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

    render() {
        return (
            <div className="order-submission-container">
                <h2>Please key in your address</h2>
                <h6>Click on "New selection" in the dropdown after typing a new address</h6>
                <br/>
                <AddressBox onChangeAddress={this.handleAddressChange} />
                <br/><br/><br/><br/>

                <h2>Amount Due: ${parseFloat(sessionStorage.getItem('amountDue')).toFixed(2)}</h2>
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
