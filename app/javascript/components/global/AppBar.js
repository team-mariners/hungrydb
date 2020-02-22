import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const AppBar = (props) => {
    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand>HungryDB</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {props.children}
        </Navbar>
    )
}

export default AppBar;