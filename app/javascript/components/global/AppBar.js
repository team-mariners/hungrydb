import React from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../../assets/images/thumbs-up-logo.png';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const AppBar = (props) => {
    const handleLogout = () => {
        console.log("Clicked");
        axios.get("/logout", {
            user: {...props.currentUser}
        }).then(() => { 
            window.location.reload(false);
        }).catch(error => {
            console.log(error.message);
        })
    };

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
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    <Button variant="outline-light">Go!</Button>
                </Form>
                <Nav>
                    {props.children}
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
           </Navbar.Collapse>
        </Navbar>
    )
}

export default AppBar;