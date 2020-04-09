import React from 'react';
import axios from 'axios';
import RestaurantSelection from './RestaurantSelection';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

class Restaurants extends React.Component {
    constructor(props) {
        super(props);
        this.handleEnterSearchQuery = this.handleEnterSearchQuery.bind(this);
        this.state = { restaurants: null, searchQuery: "" };
    }

    componentDidMount() {
        axios.get('/api/v1/restaurants/restaurants.json')
            .then(
                (response) => {
                    const retrieved_restaurants = response.data.restaurants;
                    this.setState({ restaurants: retrieved_restaurants });
                    console.log(retrieved_restaurants);
                })
            .catch(error => {
                console.log(error)
            })
    }

    handleEnterSearchQuery(e) {
        this.setState({searchQuery: e.target.value});
        console.log(e.target.value);
    }

    render() {
        if (this.state.restaurants === null) {
            return null;
        } else {
            let restaurants = this.state.restaurants.map((restaurant) => {
                if (!this.state.searchQuery ||
                    (this.state.searchQuery &&
                    restaurant.name.toUpperCase().includes(this.state.searchQuery.toUpperCase()))) {
                    return <RestaurantSelection res={restaurant}
                    onResetOrder={this.props.onResetOrder} />;
                } else {
                    return null;
                }
            })
            return (
                <div className='restaurants-container'>
                    <div><br /></div>
                    <h3>
                        {restaurants.length == 0 ? "No restaurants available." : "Restaurants"}
                    </h3>
                    <div><br /></div>
                    <Form inline>
                        <FormControl type="text" placeholder="Search Restaurants"
                            className="mr-sm-2" onChange={this.handleEnterSearchQuery} />
                    </Form>
                    <div><br /></div>
                    {restaurants}
                </div>
            )
        }
    }
}

export default Restaurants;
