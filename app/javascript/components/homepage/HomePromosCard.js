import React from 'react';
import Card from 'react-bootstrap/Card';
import promoPic from '../../../assets/images/tony-stark-raining-money.jpg';
import Button from 'react-bootstrap/Button';

const HomePromosCard = () => {
    return (
        <Card className='homepage-promo-card'>
            <Card.Img variant="top" src={promoPic} />
            <Card.Footer className="card-footer text-center">
                <h4>Ongoing Promotions</h4>
            </Card.Footer>
        </Card>
    )
}

export default HomePromosCard;
