import React from 'react';
import secureStorage from '../../utilities/HungrySecureStorage';
import ListGroup from 'react-bootstrap/ListGroup';
import FormControl from 'react-bootstrap/FormControl';

const FoodReview = (props) => {
    console.log(props.foodList);
    
    return (
        <React.Fragment>
            <h2 className='review-food-title'>
                {/* Placeholder name */}
                Review food from {secureStorage.getItem('restaurant_name')}
            </h2>

            <ListGroup horizontal style={{fontSize: 20}}>
                {props.foodList}
            </ListGroup>
            <div><br /></div>

            <FormControl as="textarea" rows="5" style={{width: "70%"}}
                onChange={props.onReviewChange} />
        </React.Fragment>
    )
}

export default FoodReview;
