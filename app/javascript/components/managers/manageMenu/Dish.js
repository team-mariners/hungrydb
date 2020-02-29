import React from 'react';

/**
 * 
 * @param {*} props 
 * dish: dish to be displayed
 */
const Dish = (props) => {
    return (
        <div className="manageMenu-dish">
            <div className="manageMenu-dish-name">
                <p><b>Name: </b>{props.dish.name}</p>
                <p><b>Category: </b>NA</p>
            </div>
            
            <div className="manageMenu-dish-price">
                <p><b>Price: </b>$ {props.dish.price}</p>
                <p><b>Daily Limit: </b>{props.dish.dailyLimit}</p>
                <p><b>Num orders: </b>{props.dish.numOrders}</p>
            </div>
        </div>
    )
};

export default Dish;