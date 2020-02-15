import React from 'react';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';

const Navigation = () => {
    return (
        <Nav justify variant="tabs" defaultActiveKey="/signup">
            <Nav.Item>
                <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            </Nav.Item>
        </Nav>
    )
};

export default Navigation;