import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginForm = () => {
    const handleLogin = () => {
        event.preventDefault();
    };

    return (
        <Form>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email"/>
            </Form.Group>

            <Form.Group>
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