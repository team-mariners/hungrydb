import React from 'react'
import axios from 'axios'

class ReviewHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {reviews: []};
    }

    componentDidMount() {
        axios.get('/api/v1/customer.json')
            .then(
                (response) => {
                    const retrieved_reviews = response.data[0].reviews
                    this.setState({ reviews: retrieved_reviews })
                    console.log("Review History: " + retrieved_reviews)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        if (this.state.reviews === null) {
            return (
                <h3>You have not done any reviews.</h3>
            )
        } else {
            let reviews = this.state.reviews.map((review) => {
                return (
                    <React.Fragment>
                        <h3>{review}</h3>
                    </React.Fragment>
                )
            })
            return (
                <React.Fragment>
                    <h3>Your Reviews:</h3>
                    {reviews}
                </React.Fragment>
            )
        }
    }
}

export default ReviewHistory
