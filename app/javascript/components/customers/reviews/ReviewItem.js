import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ReviewModal from './ReviewModal.js';

class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
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
                    review={this.props.review} />

                <button onClick={this.handleShowModal}>
                    <ListGroup.Item variant="success" style={{
                        color: "#000000", textAlign: "center",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                    }}>
                        <h4 className='review-list-item'>
                            {this.props.nameShown == "restaurant"
                                ? this.props.review.restaurant_name
                                : this.props.review.customer_name}
                        </h4>

                        <p className='review-list-item'>
                            {this.props.review.food_review
                                ? this.props.review.food_review.substr(0, 100)
                                : "Not reviewed"}
                        </p>

                        <h4 className='review-list-item'>
                            {this.props.review.rider_name}
                        </h4>

                        <p className='review-list-item'>
                            {this.props.review.rider_rating
                                ? this.props.review.rider_rating + " stars"
                                : "No rating"}
                        </p>
                    </ListGroup.Item>
                </button>
            </React.Fragment>
        )
    }
}

export default ReviewItem;
