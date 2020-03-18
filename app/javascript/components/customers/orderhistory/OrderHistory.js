import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import OrderHistoryItem from './OrderHistoryItem'

class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {orders: null};
    }

    componentDidMount() {
        axios.get('/api/v1/orders/orders.json')
            .then(
                (response) => {
                    const retrieved_orders = response.data.orders;
                    this.setState({ orders: retrieved_orders });
                    console.log("Order History: " + retrieved_orders);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        if (this.state.orders === null) {
            return (
                <h3>You have no previous orders.</h3>
            )
        } else {
            let orders = this.state.orders.map((order) => {
                return (
                    <OrderHistoryItem order={order} />
                )
            })
            return (
                <React.Fragment>
                    <div><br/></div>
                    <ListGroup style={{ width: "60%", marginLeft: "auto", marginRight: "auto" }}>
                        {orders}
                    </ListGroup>
                    <div><br/></div>
                </React.Fragment>
            )
        }
    }
}

export default OrderHistory;
