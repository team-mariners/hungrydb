import React from 'react'

class LastOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lastOrder: null};
    }

    componentDidMount() {
        fetch('/api/v1/customer.json')
            .then(res => res.json())
            .then(
                (response) => {
                    this.setState({ lastOrder: response[0].last_order[0] })
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
                </React.Fragment>
            )
        }
    }
}

export default LastOrder
