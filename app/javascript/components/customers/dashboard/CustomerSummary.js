import React from 'react'
import LastOrder from './LastOrder'
import LastReview from './LastReview'

const CustomerSummary = (props) => {
    return (
        <div className='dashboard-flex-in-flex'>
            <h2>Hi {props.currentUser.username}!</h2>
            <LastOrder />
            <LastReview />
        </div>
    )
}

export default CustomerSummary
