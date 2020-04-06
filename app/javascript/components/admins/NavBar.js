import React from 'react';
import Nav from 'react-bootstrap/Nav';
import AppBar from '../global/AppBar';
import Colors from '../global/Colors';

const NavBar = () => {
    const navLinkStyle = Colors.navbarLink;

    return (
        <AppBar isLoggedIn={true}>
            <Nav.Link href="/admin/promotions" style={navLinkStyle}>Promotions</Nav.Link>
            <Nav.Link href="/admin/roles" style={navLinkStyle}>Roles management</Nav.Link>
            <Nav.Link href="/admin/schedule" style={navLinkStyle}>Rider schedule</Nav.Link>
            <Nav.Link href="/admin/statistics" style={navLinkStyle}>Statistics</Nav.Link>
        </AppBar>
    )
}

export default NavBar;
