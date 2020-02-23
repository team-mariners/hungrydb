import React from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../../assets/images/thumbs-up-logo.png';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

/**
 * 
 * @param {*} props : The props are as follow:
 * isLoggedIn: set it to true if you want to display the logout button.
 */
const AppBar = (props) => {
    const handleLogout = () => {
        axios.get("/logout"
        ).then(() => {
            window.location.reload(false);
        }).catch(error => {
            console.log(error.message);
        })
    };

    const logoutButton = props.isLoggedIn != true ? null : 
        <Nav.Link onClick={handleLogout} style={{color: 'white'}}>Logout</Nav.Link>;

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

            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Go!</Button>
                </Form>
                <Nav >
                    {props.children}
                    {logoutButton}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AppBar;