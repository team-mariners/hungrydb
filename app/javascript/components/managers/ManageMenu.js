import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToolBar from './manageMenu/ToolBar';
import NewDish from './manageMenu/NewDish';
import DishesList from './manageMenu/DishesList';

const ManageMenu = () => {
    const [isNewDishVisible, setIsNewDishVisible] = useState(false);
    const [dishes, setDishes] = useState([]);

    // This is basically componentDidUpdate. It will be triggered at the first rendering, and will only
    // be triggered in subsequent rerendering if the array [] that is passed to it as parameter changes,
    // which in this case it will never change since the array [] is never modified.
    useEffect(() => {
        axios.get("/foods")
        .then(result => {
            console.log(result)
            setDishes(result.data);
        }).catch(error => {
            console.log(error.message);
        })
    }, []);

    return (
        <div className="p-3">
            <h1>Menu</h1>
            <ToolBar setIsNewDishVisible={() => setIsNewDishVisible(true)}/>
            <NewDish
                show={isNewDishVisible}
                onClose={() => setIsNewDishVisible(false)}
                />
            <DishesList dishes={dishes}/>
        </div>
    )
};

export default ManageMenu;