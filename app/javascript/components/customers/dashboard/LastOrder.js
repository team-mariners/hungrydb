import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import OrderHistoryItem from '../orderhistory/OrderHistoryItem';

class LastOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lastOrder: null};
    }

    componentDidMount() {
        fetch('/api/v1/customer/orders.json')
            .then(res => res.json())
            .then(
                (response) => {
                    const retrieved_last_order = response.orders[0];
                    this.setState({ lastOrder: retrieved_last_order });
                    console.log(retrieved_last_order);
                }
            )
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        if (this.state.lastOrder === null) {
            return (
                <h3>No previous orders.</h3>
            )
        } else {
            return (
                <React.Fragment>
                    <h3>Previous Order:</h3>
                    <ListGroup style={{ width: 350, marginLeft: "auto", marginRight: "auto" }}>
                        <OrderHistoryItem order={this.state.lastOrder} />
                    </ListGroup>
                    <a href="customer/history">See more orders</a>
                </React.Fragment>
            )
        }
    }
}

export default LastOrder;
