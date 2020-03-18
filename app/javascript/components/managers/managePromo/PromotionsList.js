import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Promotion from './Promotion';

const PromotionsList = () => {
    return (
        <ListGroup>
            <ListGroup.Item>
                <Promotion/>
            </ListGroup.Item>
        </ListGroup>
    )
};

export default PromotionsList;