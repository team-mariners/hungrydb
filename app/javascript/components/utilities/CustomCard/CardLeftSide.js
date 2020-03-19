import React from 'react';

const CardLeftSide = (props) => {
    return (
        <div className="manageMenu-dish-name">
            {props.children}
        </div>
    )
};

export default CardLeftSide;
