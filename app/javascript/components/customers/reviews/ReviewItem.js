import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

const ReviewItem = (props) => {

    return (
            <ListGroup.Item variant="success" style={{color: "black", textAlign: "center"}}>
                <h4>{ props.nameShown == "restaurant"
                                            ? props.review.restaurant_name
                                            : props.review.customer_name }</h4>
                <p>{ props.review.food_review }</p>
                <h4>{ props.review.rider_name }</h4>
                <p>{ props.review.rider_rating } stars</p>
            </ListGroup.Item>
    )
}

export default ReviewItem;
