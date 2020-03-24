import React from 'react';
import Media from 'react-bootstrap/Media';
import placeholderPic from '../../../../assets/images/krusty-krab.png';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class RestaurantSelection extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.restaurant = this.props.res;
        this.menu_url = "/customer/order/" + this.restaurant.id + "/menu";
        this.review_url = "/restaurants/" + this.restaurant.id + "/reviews";
        this.setSessionRestaurantInfo = this.setSessionRestaurantInfo.bind(this);
    }

    setSessionRestaurantInfo() {
        sessionStorage.setItem('restaurant_name', this.restaurant.name);
        sessionStorage.setItem('restaurant_id', this.restaurant.id);
    }

    render() {
        return (
            <React.Fragment>
                <div className='restaurant-media'>
                    {/* Store the currently selected restaurant in sessionStorage */}
                    <Link to={this.menu_url} className='restaurant-media-link'
                    onClick={this.setSessionRestaurantInfo} >
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
