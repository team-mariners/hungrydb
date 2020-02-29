import React from 'react'
import RewardPoints from './RewardPoints'
import EligiblePromos from './EligiblePromos'

const CustomerBenefits = (props) => {
    return (
        <div className='dashboard-flex-in-flex'>
            <h3>{props.currentUser.username} benefits from being loyal</h3>
            <RewardPoints />
            <EligiblePromos />
        </div>
    )
}

export default CustomerBenefits
