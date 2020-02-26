import Nav from 'react-bootstrap/Nav';
import React from 'react';
import AppBar from '../global/AppBar';

const RiderNaviBar = () => {
    return (
        <AppBar>
            <Nav className="justify-content-end">
                <Nav.Link href="/rider" style={{ color: 'white' }}>Home</Nav.Link>
                <Nav.Link href="/rider" style={{ color: 'white' }}>Job</Nav.Link>
                <Nav.Link href="/rider" style={{ color: 'white' }}>Orders</Nav.Link>
                <Nav.Link href="/rider" style={{ color: 'white' }}>Profile</Nav.Link>
                <Nav.Link href="/" style={{ color: 'white' }}>Log out</Nav.Link>
            </Nav>
        </AppBar>
    )
};

export default RiderNaviBar;
