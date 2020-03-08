import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import AppBar from '../global/AppBar';
import Colors from '../global/Colors';

const NavBar = () => {
    const navLinkStyle = Colors.navbarLink;

    return (
        <AppBar isLoggedIn={true}>
            <Nav.Link as={NavLink} to="/admin/roles" style={navLinkStyle}>Roles management</Nav.Link>
            <Nav.Link as={NavLink} to="/admin/statistics" style={navLinkStyle}>Statistics</Nav.Link>
        </AppBar>
    )
}

export default NavBar;
