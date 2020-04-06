import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ReviewModal from './ReviewModal.js';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';


class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
        this.review = this.props.review;
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
        this.state = { showModal: false };
    }

    handleShowModal = () => {
        this.setState({ showModal: true });
    }

    handleHideModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <React.Fragment>
                <ReviewModal show={this.state.showModal} onClose={this.handleHideModal}
                    review={this.review} />

                <button onClick={this.handleShowModal}>
                    <ListGroup.Item variant="success" style={{
                        color: "#000000", textAlign: "center",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                    }}>
                        <h4 className='review-list-item'>
                            {this.props.nameShown == "restaurant"
                                ? this.review.restaurant_name
                                : this.review.customer_name}
                        </h4>

                        <p className='review-list-item'>
                            {this.review.food_review
                                ? this.review.food_review.substr(0, 100)
                                : "Not reviewed"}
                        </p>

                        <h4 className='review-list-item'>
                            {this.review.rider_name}
                        </h4>

                        {this.review.rider_rating
                            ? <Rating
                                stop={this.review.rider_rating}
                                initialRating={this.review.rider_rating}
                                // emptySymbol needs to be kept for formatting reasons
                                emptySymbol={<FontAwesomeIcon icon={faStarO} />}
                                fullSymbol={<FontAwesomeIcon icon={faStar} />}
                                readonly
                              />
                            : "No rating"}
                    </ListGroup.Item>
                </button>
            </React.Fragment>
        )
    }
}

export default ReviewItem;
