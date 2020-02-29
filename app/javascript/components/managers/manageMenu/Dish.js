import React from 'react';

const Dish = (props) => {
    return (
        <div className="manageMenu-dish">
            <div className="manageMenu-dish-name">
                <p><b>Name: </b>Roti Telur</p>
                <p><b>Category: </b>Roti</p>
            </div>
            
            <div className="manageMenu-dish-price">
                <p><b>Price: </b>$1.20</p>
                <p><b>Daily Limit: </b>10</p>
                <p><b>Num orders: </b>1</p>
            </div>
        </div>
    )
};

export default Dish;