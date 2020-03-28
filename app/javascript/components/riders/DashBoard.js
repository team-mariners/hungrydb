import React from 'react';

const DashBoard = (props) => {
    return (
        <h1>Hello {props.current_user.username}!</h1>
    )
};

export default DashBoard;