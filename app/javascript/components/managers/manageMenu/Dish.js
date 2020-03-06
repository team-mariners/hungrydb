import React from 'react';
import Button from 'react-bootstrap/Button';

/**
 * 
 * @param {*} props 
 * dish: dish to be displayed
 */
const Dish = (props) => {
    return (
        <div>
            <div className="manageMenu-dish-info">
                <div className="manageMenu-dish-name">
                    <p><b>Name: </b>{props.dish.name}</p>
                    <p><b>Category: </b>{props.dish.food_category.name}</p>
                </div>
                
                <div className="manageMenu-dish-price">
                    <p><b>Price: </b>$ {parseFloat(props.dish.price).toFixed(2)}</p>
                    <p><b>Daily Limit: </b>{props.dish.dailyLimit}</p>
                    <p><b>Num orders: </b>{props.dish.numOrders}</p>
                </div>
            </div>

            <div className="manageMenu-dish-footer">
                <Button className="mr-3" onClick={() => props.showEditDish(props.dish)}>Edit</Button>
                <Button type="button" onClick={() => props.showDeleteDish(props.dish.id)}>Delete</Button>
            </div>
        </div>
   )
};

export default Dish;