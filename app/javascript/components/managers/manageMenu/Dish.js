import React from 'react';
import Button from 'react-bootstrap/Button';

/**
 * 
 * @param {*} props 
 * dish: dish to be displayed
 */
const Dish = (props) => {
    return (
        <div style={{opacity: !props.dish.is_active? "0.5": ""}}>
            <div className="manageMenu-dish-info">
                <div className="manageMenu-dish-name">
                    <p><b>Name: </b>{props.dish.f_name}</p>
                    <p><b>Section: </b>{props.dish.menu_section.ms_name}</p>
                    <p><b>Active: </b>{props.dish.is_active.toString()}</p>
                </div>
                
                <div className="manageMenu-dish-price">
                    <p><b>Price: </b>$ {parseFloat(props.dish.price).toFixed(2)}</p>
                    <p><b>Daily Limit: </b>{props.dish.daily_limit}</p>
                    <p><b>Num orders: </b>{props.dish.num_orders}</p>
                </div>
            </div>

            <div className="manageMenu-dish-footer">
                <Button className="mr-3" onClick={() => props.showEditDish(props.dish)}>Edit</Button>
                <Button 
                    type="button"
                    style={{opacity: "1"}}
                    onClick={() => props.showToggleDishIsActive(props.dish)}>
                    {props.dish.is_active ? "Deactivate" : "Activate"}
                </Button>
            </div>
        </div>
   )
};

export default Dish;