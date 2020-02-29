import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Dish from './Dish';

/**
 * 
 * @param {*} props 
 * dishes: array of dishes to be displayed
 */
const DishesList = (props) => {
    const dishes = props.dishes.map(dish => {
        return (
            <ListGroup.Item key={dish.id}><Dish dish={dish}/></ListGroup.Item>
        )
    })

    return (
        <ListGroup className="manageMenu-dishes-List">            
            <Card>
                <Card.Header>All Dishes</Card.Header>
                <ListGroup variant="flush">
                    {dishes}
                </ListGroup>
            </Card>
       </ListGroup>
    )
};

export default DishesList;