import React from 'react'
import Media from 'react-bootstrap/Media'
import placeholderPic from '../../../../assets/images/krusty-krab.png'

class RestaurantSelection extends React.Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.restaurant = this.props.res
    }

    selectRestaurant() {
        const menu_url = "/customer/order/" + this.restaurant.id + "/menu"
        // Pass restaurant_id state up through Restaurant to OrderPage
        console.log("Selected restaurant ID " + this.restaurant.id)
        this.props.onChooseRestaurant(this.restaurant.id, menu_url)
    }

    render() {
        return (
            <div className='restaurant-media' onClick={ () => this.selectRestaurant() }>
                <Media>
                    <img
                        width={120}
                        height={120}
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
            </div>
        )
    }
}

export default RestaurantSelection
