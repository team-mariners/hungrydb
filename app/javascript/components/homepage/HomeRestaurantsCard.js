import React from 'react';
import Card from 'react-bootstrap/Card';
import restaurantPic from '../../../assets/images/krusty-krab.png';

const HomeRestaurantsCard = () => {
    return (
        <Card className='homepage-card'>
            <Card.Img variant="top" src={restaurantPic}/>
            <Card.Footer className="card-footer text-center">
                <h4>Our Partner Restaurants</h4>
            </Card.Footer>
        </Card>
    )
}

export default HomeRestaurantsCard;
