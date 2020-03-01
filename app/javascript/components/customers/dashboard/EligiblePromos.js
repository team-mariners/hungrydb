import React from 'react'
import axios from 'axios'

class EligiblePromos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {promotions: []};
    }

    componentDidMount() {
        fetch('/api/v1/customer.json')
            .then(res => res.json())
            .then(
                (response) => {
                    this.setState({ promotions: response[0].promos })
                }
            )
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        if (this.state.promotions === null) {
            return (
                <h3>There are no promotions at the moment.</h3>
            )
        } else {
            let promos = this.state.promotions.map((promo) => {
                return (
                    <React.Fragment>
                        <h3>{promo}</h3>
                    </React.Fragment>
                )
            })
            return (
                <React.Fragment>
                    <h3>Promotions:</h3>
                    {promos}
                </React.Fragment>
            )
        }
    }
}

export default EligiblePromos
