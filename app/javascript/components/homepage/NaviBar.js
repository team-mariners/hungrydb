import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NaviBar = () => {
    return (
        <div>
            <Navbar className="homepage-navbar" variant="dark">
                <Navbar.Brand href="/">HungryDB</Navbar.Brand>
                <Nav className="mr-auto">
                    <Navbar.Text style={{color: 'yellow', paddingLeft:'300px', fontSize: '18px'}}>WELCOME!</Navbar.Text>
                </Nav>
                <Nav className="justify-content-end">
                    <Nav.Link href="/login" style={{color: 'white'}}>Log In</Nav.Link>
                    <Nav.Link href="/signup"style={{color: 'white'}}>Sign Up</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
};

export default NaviBar;
