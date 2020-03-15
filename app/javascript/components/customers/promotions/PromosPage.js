import React from 'react'
import axios from 'axios'

class PromosPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {promotions: null};
    }

    componentDidMount() {
        axios.get('/api/v1/customer/customer.json')
            .then(
                (response) => {
                    const retrieved_promos = response.data.promos
                    this.setState({ promotions: retrieved_promos })
                    console.log("Promotions: " + retrieved_promos)
            })
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

export default PromosPage
