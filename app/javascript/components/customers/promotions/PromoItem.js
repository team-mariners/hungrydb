import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

const PromoItem = (props) => {

    return (
            <ListGroup.Item variant="warning" style={{color: "black", textAlign: "center"}}>
                <h4>{ props.promo.promocode }</h4>
                <h5>{ props.promo.p_name }</h5>
                <h5>{ props.promo.percentage }% off</h5>
            </ListGroup.Item>
    )
}

export default PromoItem;
