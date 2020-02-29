import React from 'react';

const CustomerSummary = (props) => {
    return (
        <h2>Hello {props.currentUser.username}! You little twerp</h2>
    )
}

export default CustomerSummary;
