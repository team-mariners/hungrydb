import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Order from './Order';

const OrdersList = () => {
    return (
        <ListGroup variant="flush">
            <ListGroup.Item><Order/></ListGroup.Item>
        </ListGroup>
    )
};

export default OrdersList;