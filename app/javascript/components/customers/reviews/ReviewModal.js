import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

/**
 * A general modal dialog which can be used by other components.
 * 
 * props properties
 * show = a boolean which toggles the modal's visibility.
 * onClose = a function that is triggered when the close button of modal is clicked.
 * closeButton = an optional boolean which toggles the close button's visibility (by default true).
 * size = an optional string which determines the size of the modal (available options: sm).
 */
class ReviewModal extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.review = this.props.review;

        this.closeButton = (
            <FontAwesomeIcon icon={faTimes} onClick={this.props.onClose} size="lg"
                style={{alignSelf: "end"}} />
        );

        // The name of the css class(es) which is applied to the modal
        this.className = "custom-modal".concat(" ", this.props.className);

        // Toggles close button's visibility
        if (this.props.closeButton !== undefined && !this.props.closeButton) {
            this.closeButton = null;
        }

        // Changes the size of modal to small
        if (this.props.size !== undefined && this.props.size.localeCompare("sm") === 0) {
            this.className = this.className.concat(" ", "custom-modal-size-sm");
        }

        this.foodReviewSplit70Char = this.review.food_review
                        ? this.review.food_review.match(/.{1,100}/g).join("\n")
                        : "Not reviewed";
    }

    render() {
        // Toggles modal's visibility
        if (!this.props.show) {
            return null;
        } else {
            return (
                <div className="overlay">
                    <section className='review-modal-content' >
                        {this.closeButton}
                        
                        <h2>
                            {this.props.nameShown == "restaurant"
                                ? this.review.restaurant_name
                                : this.review.customer_name}
                        </h2>

                        <pre style={{fontFamily: "Verdana"}}>
                            {this.foodReviewSplit70Char}
                        </pre>
                        <div><br /><br /></div>

                        <h2>{this.review.rider_name}</h2>
                        <p>
                            {this.props.review.rider_rating
                                ? this.props.review.rider_rating + " stars"
                                : "No rating"}
                        </p>
                    </section>
                </div>
            )
        }
    }
};

export default ReviewModal;
