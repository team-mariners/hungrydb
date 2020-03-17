import React from 'react';
import axios from 'axios';
import ReviewItem from '../reviews/ReviewItem';
import ListGroup from 'react-bootstrap/ListGroup';
import { withRouter } from 'react-router-dom';

class RestaurantReviews extends React.Component {
    constructor(props) {
        super(props);
        // this.props.match.params.rid get :rid from URL in Route that encloses this class
        // Need to wrap this class in withRouter to use match
        console.log("Menu props res ID " + this.props.match.params.rid);
        this.restaurant_id = this.props.match.params.rid;
        this.state = {reviews: null};
    }

    componentDidMount() {
        axios.get("/api/v1/restaurants/" + this.restaurant_id + "/reviews.json")
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
                    <ReviewItem review={review} />
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

export default withRouter(RestaurantReviews);
