import React from 'react';
import Button from 'react-bootstrap/Button';
import AddressBox from './AddressBox';
import PaymentMethod from './PaymentMethod';

class CompleteOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="order-submission-container">
                <h2>Please key in your address</h2>
                <h5>Click on the box to choose from your 5 most recent addresses</h5>
                <br/>
                <AddressBox/>
                <br/><br/><br/><br/>

                <h2>Amount Due: ${parseFloat(sessionStorage.getItem('amountDue')).toFixed(2)}</h2>
                <PaymentMethod/>
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
