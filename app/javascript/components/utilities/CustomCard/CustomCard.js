import React from 'react';

const CustomCard = (props) => {
    const children = [...props.children];
    const footerIndex = children.findIndex(child => child.type.displayName === 'CardFooter');
    const footer = children[footerIndex];
    children.splice(footerIndex, 1);

    return (
        <div style={{opacity: props.disabled ? "0.5": ""}}>
            <div className="manageMenu-dish-info">
                {children}
            </div>

            <div className="manageMenu-dish-footer">
                {footer}
            </div>
        </div>
    )
};

export default CustomCard;
