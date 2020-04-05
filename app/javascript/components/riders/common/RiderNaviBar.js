import Nav from 'react-bootstrap/Nav';
import React from 'react';
import AppBar from '../../global/AppBar';
import Colors from '../../global/Colors';

const RiderNaviBar = () => {
    const navLinkstyle = Colors.navbarLink;

    return (
        <AppBar isLoggedIn={true}>
            <Nav className="justify-content-end">
                {/* <Nav.Link href="/rider" style={navLinkstyle}>Home</Nav.Link> */}
                <Nav.Link href="/rider/deliveries" style={navLinkstyle}>Deliveries</Nav.Link>
                <Nav.Link href="/rider/stats" style={navLinkstyle}>Stats</Nav.Link>
                {/* <Nav.Link href="/jobs" style={{ color: 'white' }}>Job</Nav.Link> */}
                {/* <Nav.Link href="/jobsHistory" style={{ color: 'white' }}>Orders</Nav.Link> */}
            </Nav>
        </AppBar>
    )
};

export default RiderNaviBar;
