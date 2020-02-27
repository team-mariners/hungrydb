import React from 'react';
import { NavLink } from 'react-router-dom'
import Colors from '../../global/Colors'
import AppBar from '../../global/AppBar';
import Nav from 'react-bootstrap/Nav';

const NavigationBar = () => {
    const navLinkstyle = Colors.navbarLink;

    return (
        <AppBar isLoggedIn={true}>
            <Nav.Link as={NavLink} to="/manager/orders" style={navLinkstyle}>Orders</Nav.Link>
            <Nav.Link as={NavLink} to="/manager/stats" style={navLinkstyle}>Stats</Nav.Link>
            <Nav.Link as={NavLink} to="/manager/reviews" style={navLinkstyle}>Reviews</Nav.Link>
            <Nav.Link as={NavLink} to="/manager/manage" style={navLinkstyle}>Manage</Nav.Link>
        </AppBar>
    )
}

export default NavigationBar;