import React from 'react';
import Button from 'react-bootstrap/Button';

const ToolBar = (props) => {
    return (
        <div className="manageMenu-toolbar mb-3">
            <Button onClick={props.showNewPromo}>New Promotion</Button>
        </div>
    )
};

export default ToolBar;