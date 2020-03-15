import React from 'react'

class LastReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lastReview: null};
    }

    componentDidMount() {
        fetch('/api/v1/customer/customer.json')
            .then(res => res.json())
            .then(
                (response) => {
                    retrieved_last_review = response.last_review[0]
                    this.setState({ lastOrder: retrieved_last_review })
                    console.log("Last Review: " + retrieved_last_review)
                }
            )
            .catch(error => {
                console.log(error)
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
                    <h4>{this.state.lastOrder}</h4>
                    <a href="customer/reviews">See more reviews</a>
                </React.Fragment>
            )
        }
    }
}

export default LastReview
