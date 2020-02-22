import React from 'react';
import axios from 'axios';
import AppBar from '../../global/AppBar';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = (props) => {
    const handleLogout = () => {
        console.log("Clicked");
        axios.get("/logout", {
            user: {...props.currentUser}
        }).then(() => { 
            window.location.reload(false);
        }).catch(error => {
            console.log(error.message);
        })
    };

    return (
        <AppBar>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </AppBar>
    )
};

export default NavigationBar;