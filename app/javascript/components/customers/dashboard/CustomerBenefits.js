import React from 'react'
import Points from './Points'
import EligiblePromos from './EligiblePromos'

const CustomerBenefits = (props) => {
    return (
        <div className='dashboard-flex-in-flex'>
            <h3>{props.currentUser.username} benefits from being loyal</h3>
            <Points />
            <EligiblePromos />
        </div>
    )
}

export default CustomerBenefits
