import React from 'react';
import { NavLink } from 'react-router-dom'
import Colors from '../../global/Colors'
import AppBar from '../../global/AppBar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavigationBar = () => {
    const navLinkstyle = Colors.navbarLink;
    const statsTitle = <span style={navLinkstyle}>Stats</span>;
    const manageTitle = <span style={navLinkstyle}>Manage</span>;
    
    return (
        <AppBar isLoggedIn={true}>
            <NavDropdown title={statsTitle} id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/manager/promo_stats">Promotions</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/manager/orders" style={navLinkstyle}>Orders</Nav.Link>

            <NavDropdown title={manageTitle} id="basic-nav-dropdown" >
                <NavDropdown.Item as={NavLink} to="/manager/manage_menu">Menu</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/manager/manage_promo">Promotions</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/manager/manage_info">Restaurant Information</NavDropdown.Item>
            </NavDropdown>
        </AppBar>
    )
};

export default NavigationBar;