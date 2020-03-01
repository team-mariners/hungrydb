import React from 'react'
import RewardPoints from './RewardPoints'
import EligiblePromos from './EligiblePromos'

const CustomerBenefits = (props) => {
    return (
        <div className='dashboard-flex-in-flex'>
            <RewardPoints />
            <EligiblePromos />
        </div>
    )
}

export default CustomerBenefits
