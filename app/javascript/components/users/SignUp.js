import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUp = () => {
    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>UserName</Form.Label>
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

            <Button variant="primary" type="submit">
                Sign up!
            </Button>
        </Form>
    )
}

export default SignUp;