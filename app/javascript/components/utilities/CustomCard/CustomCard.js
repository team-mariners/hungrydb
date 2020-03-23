import React from 'react';

const CustomCard = (props) => {
    let children = props.children;
    let footer = null;

    if (Array.isArray(props.children)) {
        children = [...props.children];
        const footerIndex = children.findIndex(child => child.type.displayName === 'CardFooter');
        footer = children[footerIndex];

        if (footerIndex !== -1) {
            children.splice(footerIndex, 1);
        }
    }

    return (
        <div style={{ opacity: props.disabled ? "0.5" : "" }}>
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
