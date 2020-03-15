import React from 'react'

class EligiblePromos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {promotions: []};
    }

    componentDidMount() {
        fetch('/api/v1/customer/customer.json')
            .then(res => res.json())
            .then(
                (response) => {
                    const retrieved_promos = response.promos
                    this.setState({ promotions: retrieved_promos })
                    console.log("Promos:" + retrieved_promos)
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
                <div>
                    <h3>Promotions:</h3>
                    {promos}
                    <a href="customer/promotions">See more promotions</a>
                </div>
            )
        }
    }
}

export default EligiblePromos
