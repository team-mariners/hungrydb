import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUpForm = () => {
    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>            

            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"/>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password"/>
            </Form.Group>

            <Form.Group controlId="formUserType">
                <Form.Label>Sign up as</Form.Label>
                <Form.Control as="select">
                    <option>Customer</option>
                    <option>Rider</option>
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                Sign up!
            </Button>
        </Form>
    )
};

export default SignUpForm;