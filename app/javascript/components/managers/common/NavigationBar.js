import React from 'react';
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
                <NavDropdown.Item href="/manager/promo_stats">Promotions</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/manager/orders" style={navLinkstyle}>Orders</Nav.Link>

            <NavDropdown title={manageTitle} id="basic-nav-dropdown" >
                <NavDropdown.Item href="/manager/manage_menu">Menu</NavDropdown.Item>
                <NavDropdown.Item href="/manager/manage_promo">Promotions</NavDropdown.Item>
                <NavDropdown.Item href="/manager/manage_info">Restaurant Information</NavDropdown.Item>
            </NavDropdown>
        </AppBar>
    )
};

export default NavigationBar;