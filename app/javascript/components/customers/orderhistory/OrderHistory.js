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
        axios.get('/api/v1/customer/orders.json')
            .then(
                (response) => {
                    const retrieved_orders = response.data.orders;
                    this.setState({ orders: retrieved_orders });
                    console.log(retrieved_orders);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        if (this.state.orders === null) {
            return null;
        } else {

            let orders = this.state.orders.map((order) => {
                return (
                    <OrderHistoryItem order={order} />
                )
            })
            return (
                <React.Fragment>
                    <div><br/></div>
                    <h4 className='customer-history-pages-title'>
                        {orders.length == 0 ? "You have not made any orders." : "Order History"}
                    </h4>
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
