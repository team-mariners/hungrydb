import React from 'react';
import axios from 'axios';
import RestaurantSelection from './RestaurantSelection';

class Restaurants extends React.Component {
    constructor(props) {
        super(props);
        this.state = { restaurants: null };
    }

    componentDidMount() {
        axios.get('/api/v1/restaurants/restaurants.json')
            .then(
                (response) => {
                    const retrieved_restaurants = response.data.restaurants;
                    this.setState({ restaurants: retrieved_restaurants });
                    console.log("Restaurants: " + retrieved_restaurants);
                })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        if (this.state.restaurants === null) {
            return null;
        } else {
            let restaurants = this.state.restaurants.map((restaurant) => {
                return (
                    <RestaurantSelection res={restaurant}
                        onResetOrders={this.props.onResetOrders} />
                )
            })
            return (
                <div className='restaurants-container'>
                    <div><br/></div>
                    <h3>
                        {restaurants.length == 0 ? "No restaurants available." : "Restaurants"}
                    </h3>
                    {restaurants}
                </div>
            )
        }
    }
}

export default Restaurants;
