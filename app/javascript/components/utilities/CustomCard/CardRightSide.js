import React from 'react';

const CardRightSide = (props) => {
    return (
        <div className="manageMenu-dish-price" {...props}>
            {props.children}
        </div>
    )
};

export default CardRightSide;