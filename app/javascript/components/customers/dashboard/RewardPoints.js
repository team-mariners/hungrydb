import React from 'react'

class RewardPoints extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rewardPoints: 0};
    }

    componentDidMount() {
        fetch('/api/v1/customer/customer.json')
            .then(res => res.json())
            .then(
                (response) => {
                    const retrieved_points = response.customer[0].rewardPoints;
                    this.setState({ rewardPoints: retrieved_points});
                    console.log("Points: " + retrieved_points);
                }
            )
            .catch(error => {
                console.log(error)
            })
        
        // Alternative with axios
        // axios.get('/api/v1/customer.json')
        //     .then(
        //         (response) => { this.setState({ rewardPoints: response.data[0].customer[0].rewardPoints }) }
        //     )
    }

    render() {
        return (
            <h1>Your Points: {this.state.rewardPoints}</h1>
        )
    }
}

export default RewardPoints
