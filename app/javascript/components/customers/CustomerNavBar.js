import React from 'react';
import AppBar from '../global/AppBar';
import Colors from '../global/Colors';
import Nav from 'react-bootstrap/Nav';
import { isNotOperatingHours } from '../helpers/Helpers';

const CustomerNavBar = () => {
    const navLinkstyle = Colors.navbarLink;

    const isOrderDisabled = isNotOperatingHours();

    return (
        <AppBar isLoggedIn={true}>
            <Nav.Link href="/customer/order" style={isOrderDisabled ? null : navLinkstyle} disabled={isOrderDisabled}>
                ORDER
            </Nav.Link>
            <Nav.Link href="/customer/cart" style={navLinkstyle}>CART</Nav.Link>
            <Nav.Link href="/customer/history" style={navLinkstyle}>History</Nav.Link>
            <Nav.Link href="/customer/reviews" style={navLinkstyle}>Reviews</Nav.Link>
            <Nav.Link href="/customer/promotions" style={navLinkstyle}>Promotions</Nav.Link>
        </AppBar>
    )
}

export default CustomerNavBar;
