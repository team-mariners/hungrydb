import React from 'react';
import axios from 'axios';
import ReviewItem from './ReviewItem';
import ListGroup from 'react-bootstrap/ListGroup';

class ReviewHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {reviews: null};
    }

    componentDidMount() {
        axios.get('/api/v1/reviews/reviews.json')
            .then(
                (response) => {
                    const retrieved_reviews = response.data.reviews;
                    this.setState({ reviews: retrieved_reviews });
                    console.log(retrieved_reviews);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        if (this.state.reviews === null) {
            return (
                <h3>You have not made any reviews.</h3>
            )
        } else {
            let reviews = this.state.reviews.map((review) => {
                return (
                    <ReviewItem review={review} nameShown={"restaurant"} />
                )
            })
            return (
                <React.Fragment>
                    <div><br/></div>
                    <ListGroup style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
                        {reviews}
                    </ListGroup>
                    <div><br/></div>
                </React.Fragment>
            )
        }
    }
}

export default ReviewHistory;
