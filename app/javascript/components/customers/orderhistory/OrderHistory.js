import React from 'react'
import axios from 'axios'

class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {orders: []};
    }

    componentDidMount() {
        axios.get('/api/v1/customer.json')
            .then(
                (response) => {
                    const retrieved_orders = response.data[0].orders
                    this.setState({ orders: retrieved_orders })
                    console.log("Order History: " + retrieved_orders)
            })
            .catch(error => {
                console.log(error)
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
                    <React.Fragment>
                        <h3>{order}</h3>
                    </React.Fragment>
                )
            })
            return (
                <React.Fragment>
                    <h3>Your Orders:</h3>
                    {orders}
                </React.Fragment>
            )
        }
    }
}

export default OrderHistory
