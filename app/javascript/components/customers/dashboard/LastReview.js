import React from 'react'

class LastReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lastReview: null};
    }

    componentDidMount() {
        fetch('/api/v1/customer.json')
            .then(res => res.json())
            .then(
                (response) => {
                    this.setState({ lastOrder: response[0].last_review[0] })
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
                </React.Fragment>
            )
        }
    }
}

export default LastReview
