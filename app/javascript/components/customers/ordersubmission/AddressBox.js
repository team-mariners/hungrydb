import React from 'react';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';


class AddressBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { recentAddresses: [] };
    }

    componentDidMount() {
        axios.get('/api/v1/customer/orders.json')
            .then(
                (response) => {
                    const retrieved_orders = response.data.orders;
                    let orders = retrieved_orders;
                    console.log(orders);

                    // Addresses already in order thanks to SQL Order By
                    let addresses = orders.map(order => order["address"])

                    // Remove duplicates
                    let uniqueAddresses = addresses.filter((address, index) =>
                        addresses.indexOf(address) == index
                    )
                    /* Using Set:
                    let uniqueAddresses = [...new Set(addresses)]
                    OR uniqueAddresses = Array.from(new Set(addresses))
                    */

                    this.setState({ recentAddresses: uniqueAddresses.slice(0, 5) });
                    console.log(this.state.recentAddresses);
                })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <Typeahead id="address-typeahead"
                allowNew
                onChange={ entered => this.props.onChangeAddress(entered[0]) }
                options={this.state.recentAddresses}
                placeholder="Address"
            />
        )
    }
}

export default AddressBox;
