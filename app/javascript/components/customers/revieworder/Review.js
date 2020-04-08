import React from 'react';
import axios from 'axios';
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.state = { riderRating: null, foodReview: "" }
        console.log(document.cookie)
    }

    handleChangeRiderRating(value) {
        console.log(value);
        let changedValue = value ? parseInt(value) : null;
        this.setState({ riderRating: changedValue });
    }

    handleChangeFoodReview(e) {
        console.log(e.target.value);
        this.setState({ foodReview: e.target.value })
    }

    handleSubmit(e) {
        if (!this.state.riderRating && !this.state.foodReview) {
            alert("Your must review at least the rider or the food");
            e.preventDefault();
            return;
        }

        if (this.state.foodReview.length > 1000) {
            alert("Your food review exceeds 1000 characters!");
            e.preventDefault();
            return;
        }

        let review = {};
        review["oid"] = document.cookie.split("=")[1];
        review["rider_id"] = 3;
        review["rider_rating"] = this.state.riderRating
            ? this.state.riderRating
            : "null";
        review["food_review"] = this.state.foodReview
            ? this.state.foodReview
            : "";

        axios.post('/review', review)
            .then((result) => {
                console.log(result);
                alert("Your review has been submitted");
            }).catch((error) => {
                console.log(error);
                alert("Failed to submit review!");
            })

        secureStorage.clear();
        document.cookie = "oid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }

    handleSkip() {
        if (!confirm("Confirm Skip Review?")) {
            e.preventDefault();
            return;
        }
        secureStorage.clear();
        document.cookie = "oid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
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
            <Form className="review-form">

                <RiderRating riderName="rider" onRatingChange={this.handleChangeRiderRating} />
                <div><br /><br /><br /><br /></div>

                <FoodReview foodList={foodList} onReviewChange={this.handleChangeFoodReview} />
                <p style={{ marginTop: 10 }}>{this.state.foodReview.length}/1000 characters</p>
                <div><br /><br /><br /></div>

                <div className="review-form-buttons">
                    <div>
                        <Button variant="success" type="submit" size="lg" href="/"
                            onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </div>

                    <div>
                        <Button variant="light" type="submit" size="lg" href="/"
                            onClick={this.handleSkip}>
                            Skip
                        </Button>
                    </div>
                </div>

                <div><br /><br /><br /></div>
            </Form>
        )
    }
}

export default Review;
