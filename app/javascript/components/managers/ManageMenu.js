import React, { useState } from 'react';
import ToolBar from './manageMenu/ToolBar';
import NewDish from './manageMenu/NewDish';
import DishesList from './manageMenu/DishesList';

const ManageMenu = () => {
    const [isNewDishVisible, setIsNewDishVisible] = useState(false);

    return (
        <div className="p-3">
            <h1>Menu</h1>
            <ToolBar setIsNewDishVisible={() => setIsNewDishVisible(true)}/>
            <NewDish show={isNewDishVisible} onClose={() => setIsNewDishVisible(false)}/>
            <DishesList/>
        </div>
    )
};

export default ManageMenu;