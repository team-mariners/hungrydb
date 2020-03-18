import React from 'react';
import Promotions from './managePromo/Promotions';
import ToolBar from './managePromo/ToolBar';

const ManagePromo = () => {
    return (
        <div className="p-3">
            <h1>Promotions</h1>
            <ToolBar/>
            <Promotions/>
        </div>
    )
};

export default ManagePromo;