import React from 'react';
import ReviewItem from '../reviews/ReviewItem';
import ListGroup from 'react-bootstrap/ListGroup';

class LastReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lastReview: null};
    }

    componentDidMount() {
        fetch('/api/v1/reviews/reviews.json')
            .then(res => res.json())
            .then(
                (response) => {
                    let retrieved_last_review = response.reviews[0];
                    this.setState({ lastReview: retrieved_last_review });
                    console.log(retrieved_last_review);
                }
            )
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        if (this.state.lastReview === null) {
            return (
                <h3>No previous reviews.</h3>
            )
        } else {
            return (
                <React.Fragment>
                    <h3>Previous Review:</h3>
                    <ListGroup style={{marginLeft: "auto", marginRight: "auto"}}>
                        <ReviewItem review={this.state.lastReview} nameShown={"restaurant"} />
                    </ListGroup>
                    <br />
                    <a href="customer/reviews">See more reviews</a>
                </React.Fragment>
            )
        }
    }
}

export default LastReview
