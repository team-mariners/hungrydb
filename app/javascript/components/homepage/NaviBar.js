import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Logo from '../../../assets/images/thumbs-up-logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from 'react';

const NaviBar = () => {
    return (
        <div>
            <Navbar id="homepage-navbar" variant="dark">
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

                <Nav className="mr-auto">
                    <Form inline style={{ paddingLeft: "300px" }}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Go!</Button>
                    </Form>
                </Nav>

                <Nav className="justify-content-end">
                    <Nav.Link href="/login" style={{ color: 'white' }}>Log In</Nav.Link>
                    <Nav.Link href="/signup" style={{ color: 'white' }}>Sign Up</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
};

export default NaviBar;
