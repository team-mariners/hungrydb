import React from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import RiderRating from './RiderRating';
import FoodReview from './FoodReview';
import Button from 'react-bootstrap/Button';
import secureStorage from '../../utilities/HungrySecureStorage';

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeRiderRating = this.handleChangeRiderRating.bind(this);
        this.handleChangeFoodReview = this.handleChangeFoodReview.bind(this);
        this.state = {riderRating: null, foodReview: null}
    }

    handleChangeRiderRating(value) {
        console.log(value);
        let changedValue = value ? parseInt(value) : null;
        this.setState({riderRating: changedValue});
    }

    handleChangeFoodReview(e) {
        console.log(e.target.value);
        this.setState({foodReview: e.target.value})
    }

    render() {
        let foodObject = JSON.parse(secureStorage.getItem('foods'));
        let foodList = [];
        for (let food in foodObject) {
            if (foodObject.hasOwnProperty(food)) {
                foodList.push(<ListGroup.Item>{food}</ListGroup.Item>);
            }
        }
        return (
            <Form className="review-form" onSubmit={() => secureStorage.clear()}>

                <RiderRating onRatingChange={this.handleChangeRiderRating} />
                <div><br /><br /><br /><br /></div>

                <FoodReview foodList={foodList} onReviewChange={this.handleChangeFoodReview} />
                <div><br /><br /><br /></div>

                <div className="review-form-buttons">
                    <div><Button variant="success" type="submit" size="lg" onClick={() => secureStorage.clear()}>Submit</Button></div>
                    <div><Button variant="light" type="submit" size="lg" onClick={() => secureStorage.clear()}>No Thanks</Button></div>
                </div>

                <div><br /><br /><br /></div>

                {/* <div className="mb-3">
                <input type="radio" id="one" name="rating" value="one"/>
                <label for="one">1</label>

                <input type="radio" id="two" name="rating" value="two"/>
                <label for="two">2</label>
                
                <input type="radio" id="three" name="rating" value="three"/>
                <label for="three">3</label>

                <label>
                    <input type="radio" name="rating" value="four"/>
                    4
                </label>

                <label>
                    <input type="radio" name="rating" value="five"/>
                    5
                </label>
            </div> */}
            </Form>
        )
    }
}

export default Review;
