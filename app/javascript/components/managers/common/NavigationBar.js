import React from 'react';
import { NavLink } from 'react-router-dom'
import Colors from '../../global/Colors'
import AppBar from '../../global/AppBar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavigationBar = () => {
    const navLinkstyle = Colors.navbarLink;
    const dropDownTitle = <span style={navLinkstyle}>Manage</span>

    return (
        <AppBar isLoggedIn={true}>
            <Nav.Link as={NavLink} to="/manager/orders" style={navLinkstyle}>Orders</Nav.Link>
            <Nav.Link as={NavLink} to="/manager/stats" style={navLinkstyle}>Stats</Nav.Link>
            <Nav.Link as={NavLink} to="/manager/reviews" style={navLinkstyle}>Reviews</Nav.Link>
            <NavDropdown title={dropDownTitle} id="basic-nav-dropdown" >
                <NavDropdown.Item as={NavLink} to="/manager/manage_menu">Menu</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/manager/manage_promo">Promotion</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/manager/manage_info">Restaurant Information</NavDropdown.Item>
            </NavDropdown>
        </AppBar>
    )
}

export default NavigationBar;