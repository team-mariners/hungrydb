import React from 'react';

const CardLeftSide = (props) => {
    return (
        <div className="manageMenu-dish-name" {...props}>
            {props.children}
        </div>
    )
};

export default CardLeftSide;
