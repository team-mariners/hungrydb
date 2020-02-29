import React from 'react'
import AppBar from '../global/AppBar'
import Colors from '../global/Colors'
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

const CustomerNavBar = () => {
    const navLinkstyle = Colors.navbarLink

    return (
        <AppBar isLoggedIn={true}>
            <Nav.Link as={NavLink} to="/customer/history" style={navLinkstyle}>History</Nav.Link>
            <Nav.Link as={NavLink} to="/customer/reviews" style={navLinkstyle}>Reviews</Nav.Link>
            <Nav.Link as={NavLink} to="/customer/promotions" style={navLinkstyle}>Promotions</Nav.Link>
        </AppBar>
    )
}

export default CustomerNavBar