import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const LoginForm = () => {
    const handleLogin = () => {
        event.preventDefault();

        axios.post('/login', {
            user: {
                username: document.getElementById("formUsername").value,
                password: document.getElementById("formPassword").value,
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    };

    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleLogin}>
                Login
            </Button>
        </Form>
    )
};

export default LoginForm;