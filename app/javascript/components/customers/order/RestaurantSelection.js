import React from 'react';
import Media from 'react-bootstrap/Media';
import placeholderPic from '../../../../assets/images/krusty-krab.png';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import secureStorage from '../../utilities/HungrySecureStorage';

class RestaurantSelection extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.restaurant = this.props.res;
        this.menu_url = "/customer/order/" + this.restaurant.id + "/menu";
        this.review_url = "/restaurants/" + this.restaurant.id + "/reviews";
        this.handleSelectRestaurant = this.handleSelectRestaurant.bind(this);
        this.setSessionRestaurantInfo = this.setSessionRestaurantInfo.bind(this);
    }

    handleSelectRestaurant(e) {
        let currentOrderRestaurant = secureStorage.getItem('restaurant_name');
        // Check if there are already orders placed under a different restaurant
        if (secureStorage.getItem('foods') && currentOrderRestaurant &&
            this.restaurant.name !== currentOrderRestaurant) {
            if (!this.confirmChangeRestaurant(currentOrderRestaurant)) {
                e.preventDefault();
                return;
            }
            // Clears sessionStorage and resets order if no restaurant name
            // in sessionStorage or customer chooses to change restaurant
            secureStorage.clear();
            this.props.onResetOrder();
            this.setSessionRestaurantInfo();
        }
    }

    confirmChangeRestaurant(currentOrderRestaurant) {
        return confirm("WARNING: You can only order from ONE restaurant."
            + "\n\nYou have placed orders from "
            + currentOrderRestaurant.toUpperCase()
            + ". Your current orders will be removed if you choose another restaurant."
            + "\n\nAre you sure you want to choose "
            + this.restaurant.name.toUpperCase() + "?");
    }

    setSessionRestaurantInfo() {
        secureStorage.setItem('restaurant_name', this.restaurant.name);
        secureStorage.setItem('restaurant_id', this.restaurant.id);
        secureStorage.setItem('restaurant_min', this.restaurant.min_order_cost);
    }

    render() {
        return (
            <React.Fragment>
                <div className='restaurant-media'>
                    {/* Store the currently selected restaurant in sessionStorage */}
                    <Link to={this.menu_url} className='restaurant-media-link'
                        onClick={this.handleSelectRestaurant} >
                        <Media>
                            <img
                                width={130}
                                height={130}
                                className="align-self-center mr-3"
                                src={placeholderPic}
                                alt="Generic placeholder"
                            />
                            <Media.Body>
                                <h5 />
                                <h3>{this.restaurant.name}</h3>
                                <p>{this.restaurant.address}</p>
                                <h5>Min Order: {this.restaurant.min_order_cost}</h5>
                            </Media.Body>
                        </Media>
                    </Link>
                </div>
                <a href={this.review_url}>See Reviews</a>
            </React.Fragment>
        )
    }
}

export default RestaurantSelection;
