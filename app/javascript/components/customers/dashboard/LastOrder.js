import React from 'react'

class LastOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lastOrder: null};
    }

    componentDidMount() {
        fetch('/api/v1/customer/customer.json')
            .then(res => res.json())
            .then(
                (response) => {
                    const retrieved_last_order = response.last_order[0]
                    this.setState({ lastOrder: retrieved_last_order })
                    console.log("Last Order: " + retrieved_last_order)
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
                    <h4>{this.state.lastOrder}</h4>
                    <a href="customer/history">See more orders</a>
                </React.Fragment>
            )
        }
    }
}

export default LastOrder
