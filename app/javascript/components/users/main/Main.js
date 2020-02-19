import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Container from './Container';
import Navbar from 'react-bootstrap/Navbar';

const Main = () => {
    return (
        <Router>
            <Navbar variant="dark" className="custom-nav-bar">
                <Navbar.Brand>Hungrydb</Navbar.Brand>
            </Navbar>
            <Container/>
        </Router>
    )
};

export default Main;