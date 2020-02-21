import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Index = (props) => {
    const handleLogout = () => {
        axios.get("/logout", {
            user: {...props.current_user}
        }).then(result => {
            window.location.reload(true);
        }).catch(error => {
            console.log(error.message);
        })
    };

    const isSignedIn = !!props.current_user;
    const message = isSignedIn ? `Hello ${props.current_user.username}!` : `You have not signed in.`;
    const logOutButton = !isSignedIn ? null : (<Button type="button" onClick={handleLogout}>Logout</Button>);

    return (
        <div>
            <h1>Hello!</h1>
            <p>{message}</p>
            <Button type="button">Hit me!</Button>
            {logOutButton}
        </div>
    )
};

export default Index;