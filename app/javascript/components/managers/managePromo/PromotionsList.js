import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Promotion from './Promotion';

const PromotionsList = (props) => {
    const promotions = props.promotions.map(promotion => {
        return (
            <ListGroup.Item key={promotion.id}>
                <Promotion promotion={promotion} {...props}/>
            </ListGroup.Item>
        )
    });

    return (
        <ListGroup variant="flush">
            {promotions}
       </ListGroup>
    )
};

export default PromotionsList;