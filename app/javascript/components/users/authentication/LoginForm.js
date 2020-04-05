import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import * as yup from 'yup';
import { Formik } from 'formik';
import secureStorage from '../../utilities/HungrySecureStorage';

const LoginForm = (props) => {
    /*
     * Identifier refers to username or email.
     * The validation rules of username and email is the same as the ones in signup form.
     */
    const schema = yup.object({
        identifier: yup.string().matches(/^\w+$|^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/).required(),
        password: yup.string().required()
    });

    const formInitialValues = {
        identifier: '',
        password: ''
    };

    const handleLogin = (values, formik) => {
        axios.post('/login', {
            user: {
                login: values.identifier,
                password: values.password,
            },
            withCredentials: true
        }).then(() => {
            window.location.reload(true);
        }).catch((error) => {
            // If server sends back an error response
            if (error.response) {
                const message = error.response.status == 401 ? "Invalid login credentials."
                    : "Something went wrong. Please contact the system administrator.";
                props.showAlert(message);
            } else {
                // Else just display the error message 
                // This is an error thrown by the client side, e.g. axios
                props.showAlert(error.message);
            }

            formik.setSubmitting(false);
        });
        secureStorage.clear();
    };

    return (
        <Formik
            validationSchema={schema}
            initialValues={formInitialValues}
            onSubmit={handleLogin}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                errors,
                touched,
                isSubmitting
            }) => (
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username or Email</Form.Label>
                    <Form.Control
                        type="text"
                        name="identifier"
                        value={values.identifier}
                        onChange={handleChange}
                        isInvalid={touched.identifier && !!errors.identifier}
                    />
                    <Form.Control.Feedback type="invalid">Username or email is invalid.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">Password is invalid.</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isSubmitting}>Login</Button>
            </Form>
           )}
        </Formik>
    )
};

export default LoginForm;