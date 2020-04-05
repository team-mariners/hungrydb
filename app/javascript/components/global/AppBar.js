import React from 'react';
import axios from 'axios';
import Colors from './Colors';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../../assets/images/thumbs-up-logo.png';
import Nav from 'react-bootstrap/Nav';
import secureStorage from '../utilities/HungrySecureStorage';

/**
 *
 * @param {*} props : The props are as follow:
 * isLoggedIn: set it to true if you want to display the logout button.
 */
const AppBar = (props) => {
    const navLinkstyle = Colors.navbarLink;

    const handleLogout = () => {
        secureStorage.clear();
        axios.get("/logout"
        ).then(() => {
            // Redirect to homepage after successfully logged out
            window.location.replace("/");
        }).catch(error => {
            console.log(error.message);
        })
    };

    let logoutButton = null;
    let profileButton = null;
    if (props.isLoggedIn == true) {
        logoutButton = <Nav.Link onClick={handleLogout} style={navLinkstyle}>Logout</Nav.Link>;
        profileButton = <Nav.Link href="/profile" style={navLinkstyle}>Profile</Nav.Link>
    }

    return (
        <Navbar variant="dark" className="app-bar" expand="lg">
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src={Logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                {' '}
                HungryDB
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav >
                    {props.children}
                    {profileButton}
                    {logoutButton}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default AppBar;