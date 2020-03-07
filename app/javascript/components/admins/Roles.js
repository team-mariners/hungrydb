import React from 'react';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';

const Roles = (props) => {
    const validation = Yup.object({
        identifier: Yup.string()
            .matches(/^\w+$|^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/)
            .required()
    });

    const initialVals = {
        identifier: ''
    };

    const handleRoleEdit = (values, formik) => {
        console.log(values);

        formik.setSubmitting(false);
    }

    return (
        <Formik
            validationSchema={validation}
            initialValues={initialVals}
            onSubmit={handleRoleEdit}
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

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    Go
                </Button>
            </Form>
           )}
        </Formik>
    )
};

export default Roles;
