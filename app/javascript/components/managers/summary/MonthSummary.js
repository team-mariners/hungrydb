import React from 'react';

const MonthSummary = (props) => {
    return (
        <div {...props}>
            <h3 style={{textDecoration: "underline"}}>Summary</h3>
            <p><b>Total Orders: </b></p>
            <p><b>Total Orders Cost: </b></p>
            <p><b>Top 5 favourite Dishes: </b></p>
        </div>
    )
};

export default MonthSummary;