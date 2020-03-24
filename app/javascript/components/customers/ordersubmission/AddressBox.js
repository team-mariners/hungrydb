import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';


class AddressBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { recentAddresses: [] };
    }

    componentDidMount() {
        axios.get('/api/v1/orders/orders.json')
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

                    this.setState({ recentAddresses: uniqueAddresses.slice(0, 1) });
                    console.log(this.state.recentAddresses);
                })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <Typeahead
                id="basic-example"
                // onChange={selected => this.setState({ selected })}
                options={this.state.recentAddresses}
                placeholder="Choose a state..."
            />


            // <Form inline>
            //     <FormControl type="text"
            //         placeholder="Address"
            //         className="mr-sm-2" style={{ width: 1000 }}
            //         onChange={props.handleInsertChange} />
            // </Form>
        )
    }
}

export default AddressBox;
