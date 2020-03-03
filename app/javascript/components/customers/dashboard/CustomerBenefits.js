import React from 'react'
import RewardPoints from './RewardPoints'
import EligiblePromos from './EligiblePromos'

const CustomerBenefits = (props) => {
    return (
        <div>
            <div className='dashboard-right-flex'>
                <RewardPoints />
            </div>
            <div className='dashboard-right-flex'>
                <EligiblePromos />
            </div>
        </div>
    )
}

export default CustomerBenefits
