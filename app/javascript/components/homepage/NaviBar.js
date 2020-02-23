import Nav from 'react-bootstrap/Nav';
import React from 'react';
import AppBar from '../global/AppBar';

const NaviBar = () => {
    return (
        <AppBar>
            <Nav className="justify-content-end">
                <Nav.Link href="/login" style={{ color: 'white' }}>Log In</Nav.Link>
                <Nav.Link href="/signup" style={{ color: 'white' }}>Sign Up</Nav.Link>
            </Nav>
        </AppBar>
    )
};

export default NaviBar;
