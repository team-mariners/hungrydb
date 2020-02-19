import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { Formik } from 'formik';

const LoginForm = () => {
    const schema = yup.object({
        email: yup.string().required(),
        password: yup.string().required()
    });

    const formInitialValues = {
        email: '',
        password: ''
    };

    const handleLogin = (values) => {
        console.log(values);
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
                touched
            }) => (
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">Email cannot be empty.</Form.Control.Feedback>
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
                <Button variant="primary" type="submit">Login</Button>
            </Form>
           )}
        </Formik>
    )
};

export default LoginForm;