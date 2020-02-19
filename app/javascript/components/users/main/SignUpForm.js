import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { Formik } from 'formik';

const SignUpForm = () => {
    /* Using yup helps us to declaratively verify the input data
     * Username can only be alphanumeric.
     * Email needs to match the format [text]@[text].[text].
     * Password cannot have whitespace characters.
     */
    const schema = yup.object({
        username: yup.string().matches(/^\w+$/).required(),
        email: yup.string().matches(/^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/).required(),
        password: yup.string().min(8).max(20).matches(/^\S+$/).required(),
        confirmPassword: yup.string().oneOf([yup.ref('password')]).required(),
        terms: yup.bool().oneOf([true])
    });

    const formInitialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false
    };

    const handleSignUp = (values) => {
        console.log(values);
    };

    return (
        <Formik
            validationSchema={schema}
            onSubmit={handleSignUp}
            initialValues={formInitialValues}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                errors,
                touched
            }) => (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={touched.username && !!errors.username}
                        />
                    <Form.Text className="text-muted">Username needs to be alphanumeric.</Form.Text>
                    <Form.Control.Feedback type="invalid">Username is invalid.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={touched.email && !!errors.email}
                        />
                    <Form.Control.Feedback type="invalid">Email is invalid.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                        />
                    <Form.Text className="text-muted">
                        Password needs to be at least 8 characters long and cannot have spaces.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">Password is invalid.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                        />
                    <Form.Control.Feedback type="invalid">Password does not match.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formTerms">
                    <Form.Check>
                        <Form.Check.Input type="checkbox"
                            name="terms"
                            value={values.terms}
                            isInvalid={touched.terms && !!errors.terms}
                            onChange={handleChange}/>
                        <Form.Check.Label>I agree to the terms and conditions.</Form.Check.Label>
                        <FormControl.Feedback type="invalid">
                            You need to agree to the terms and conditions first.
                    </FormControl.Feedback>
                    </Form.Check>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Sign up!
            </Button>
            </Form>
            )}
        </Formik>
    )
};

export default SignUpForm;