import React, { useState } from 'react';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as Yup from 'yup';
import axios from 'axios';

const Roles = (props) => {
    const validation = Yup.object({
        identifier: Yup.string()
            .matches(/^\w+$/)
            .required()
    });

    const initialVals = {
        identifier: (props.username == null) ? '' : props.username
    };

    const handleUsername = (values, formik) => {
        axios.post('/admin/getuserid', {
            username: values.identifier
        }).then((response) => {
            if (response.data == false) {
                const message = "This user does not exist!";
                console.log(message);
            } else {
                window.location.assign('/admin/roles/' + response.data);
            }
        }).catch((error) => {
            console.log(error);
        });

        formik.setSubmitting(false);
    }

    const handleRole = (values, formik) => {
        console.log(values);

        formik.setSubmitting(false);
    }

    const displayUserRoleEdit = () => {
        if (props.userid != null) {
            const roles = props.rolesAvailable.filter((value, index, arr) => {
                return value != props.userrole;
            })
            const options = roles.map((value) => {
                return (<option>{value}</option>);
            })

            return (
                <React.Fragment>
                    <p>User "{props.username}" with userid {props.userid} currently has the role: {props.userrole}</p>
                    <Formik
                        validationSchema={validation}
                        initialValues={initialVals}
                        onSubmit={handleRole}
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
                            <Form.Group as={Row} controlId="formRole">
                                <Form.Label column sm={2}>
                                    Select new role:
                                </Form.Label>
                                <Col sm={3}>
                                    <Form.Control name="role" as="select">
                                        {options}
                                    </Form.Control>
                                </Col>
                                <Button variant="primary" type="submit" disabled={isSubmitting} sm={1}>
                                    Go
                                </Button>
                            </Form.Group>
                        </Form>
                    )}
                    </Formik>
                </React.Fragment>
            )
        } else {
            return;
        }
    }

    return (
        <React.Fragment>
            <h2>Roles management</h2>
            <Formik
                validationSchema={validation}
                initialValues={initialVals}
                onSubmit={handleUsername}
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
                    <Form.Group as={Row} controlId="formUsername">
                        <Form.Label column sm={2}>
                            Enter a username:
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control
                                type="text"
                                name="identifier"
                                value={values.identifier}
                                onChange={handleChange}
                                isInvalid={touched.identifier && !!errors.identifier}
                            />
                        </Col>
                        <Form.Control.Feedback type="invalid">Username is invalid.</Form.Control.Feedback>

                        <Button variant="primary" type="submit" disabled={isSubmitting} sm={1}>
                            Go
                        </Button>
                    </Form.Group>
                </Form>
            )}
            </Formik>
            {displayUserRoleEdit()}

        </React.Fragment>
    )
};

export default Roles;
