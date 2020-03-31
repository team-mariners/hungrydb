import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import FormControl from 'react-bootstrap/FormControl';

const FoodReview = (props) => {
    return (
        <React.Fragment>
            <h2 className='review-food-title'>
                {/* Placeholder name */}
                Review food from {sessionStorage.getItem('restaurant_name')}
            </h2>

            <ListGroup horizontal style={{fontSize: 20}}>
                {props.foodList}
            </ListGroup>
            <div><br /></div>

            <FormControl as="textarea" rows="5" style={{width: "70%"}} />
        </React.Fragment>
    )
}

export default FoodReview;
