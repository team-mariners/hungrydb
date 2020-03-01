import React from 'react'
import LastOrder from './LastOrder'
import LastReview from './LastReview'

const CustomerSummary = (props) => {
    return (
        <div>
            <div className='dashboard-left-flex'>
                <h2>Hi {props.currentUser.username}!</h2>
            </div>
            <div className='dashboard-left-flex'>
                <LastOrder />
            </div>
            <div className='dashboard-left-flex'>
                <LastReview />
            </div>
        </div>
    )
}

export default CustomerSummary
