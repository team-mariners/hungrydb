import React from 'react';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

class RiderRating extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeRating = this.handleChangeRating.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = { rating: 0 };
    }

    handleChangeRating(value) {
        this.setState({rating: value});
        this.props.onRatingChange(value);
    }

    handleReset(e) {
        this.setState({rating: 0});
        this.props.onRatingChange(null);
        e.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <h2 className='review-rider-title'>
                    Rate Rider: {this.props.riderName}
                </h2>

                <div className='rider-rating-container'>
                    <Rating
                        stop={5}
                        emptySymbol={<FontAwesomeIcon icon={faStarO}
                            style={{ color: "#ffe400" }} className="fa-3x" />}
                        fullSymbol={<FontAwesomeIcon icon={faStar}
                            style={{ color: "#ffe400" }} className="fa-3x" />}
                        onClick={this.handleChangeRating}
                        initialRating={this.state.rating}
                    />

                    {/* Non-refreshing button type */}
                    <button className='rider-rating-reset-button'
                        onClick={this.handleReset}>Reset</button>
                </div>
            </React.Fragment>
        )
    }
}

export default RiderRating;
