import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Link from 'react-router-dom/Link';

const Navigation = () => {
    return (
        <Nav justify variant="tabs" defaultActiveKey="/signup">
            <Nav.Item>
                <Nav.Link as={Link} href="/signup">Sign Up</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link>Login</Nav.Link>
            </Nav.Item>
        </Nav>
    )
};

export default Navigation;