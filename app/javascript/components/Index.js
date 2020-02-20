import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Index = (props) => {
    console.log(props.current_user);

    const handleLogout = () => {
        console.log("Logging out...");
        axios.get("/logout", {
            user: {...props.current_user}
        }).then(result => {
            console.log(result);
            window.location.reload(false);
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