import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Dish from './Dish';

const DishesList = () => {
    return (
        <ListGroup className="manageMenu-dishes-List">            
            <Card>
                <Card.Header>All Dishes</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item><Dish/></ListGroup.Item>
                </ListGroup>
            </Card>
       </ListGroup>
    )
};

export default DishesList;