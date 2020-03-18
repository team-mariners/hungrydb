import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Promotion from './Promotion';

const PromotionsList = () => {
    return (
        <ListGroup variant="flush">
            <ListGroup.Item>
                <Promotion/>
            </ListGroup.Item>
        </ListGroup>
    )
};

export default PromotionsList;