import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const SignUpForm = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [isInvalidSubmission, setIsInvalidSubmission] = useState(false);

    const handleSignUp = (event) => {
        event.preventDefault();

        if (!isAgreed) {
            setIsInvalidSubmission(true);
            return;
        }

        setIsInvalidSubmission(false);
    };

    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>            

            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email"/>
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

            <Form.Group controlId="formTerms">
                <Form.Check>
                    <Form.Check.Input type="checkbox"
                        isInvalid={isInvalidSubmission}
                        onClick={() => setIsAgreed(!isAgreed)}/>
                    <Form.Check.Label>I agree to the terms and conditions.</Form.Check.Label>
                    <FormControl.Feedback type="invalid">
                        You need to agree to the terms and conditions first.
                    </FormControl.Feedback>
                </Form.Check>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSignUp}>
                Sign up!
            </Button>
        </Form>
    )
};

export default SignUpForm;