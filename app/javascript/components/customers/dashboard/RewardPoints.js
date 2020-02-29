import React from 'react'

class RewardPoints extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rewardPoints: 0};
    }

    componentDidMount() {
        fetch('/api/v1/customer.json')
            .then(res => res.json())
            .then(
                (result) => { this.setState({ rewardPoints: result[0].rewardPoints }) }
            )
    }

    render() {
        return (
            <h1>Your Points: {this.state.rewardPoints}</h1>
        )
    }
}

export default RewardPoints
