import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Dashboard = (props) => {
    const initialVals = {
        email: props.currentUser.email
    }

    const initialPasswordVals = {
        curPassword: '',
        newPassword: '',
        confirmPassword: ''
    }

    const initialCustomerVals = {
        can: (props.roleAttributes.can == null) ? '' : props.roleAttributes.can,
        cvv: (props.roleAttributes.cvv == null) ? '' : props.roleAttributes.cvv
    }

    const validation = Yup.object({
        email: Yup.string().email().required()
    });

    const validationPassword = Yup.object({
        curPassword: Yup.string().min(8).max(20).matches(/^\S+$/).required(),
        newPassword: Yup.string().min(8).max(20).matches(/^\S+$/).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')]).required()
    })

    const validationCustomer = Yup.object({
        can: Yup.number().integer().max(9999999999999999).required(),
        cvv: Yup.number().integer().max(999).required()
    })

    const handleSubmit = (values, formik) => {
        axios.post('/profile', {
            id: props.currentUser.id,
            email: values.email
        }).then((response) => {
            if (response.data == false) {
                const message = "Could not update user information!";
                console.log(message);
            } else {
                window.location.assign(window.location);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const handlePasswordSubmit = (values, formik) => {
        axios.post('/profile', {
            id: props.currentUser.id,
            curPassword: values.curPassword,
            newPassword: values.newPassword
        }).then((response) => {
            if (response.data == false) {
                const message = "Could not update user's password!";
                console.log(message);
                formik.setErrors({curPassword: "Incorrect password"});
            } else {
                axios.post('/login', {
                    user: {
                        login: props.currentUser.username,
                        password: values.newPassword,
                    },
                    withCredentials: true
                })
                // Wait a while before reloading as the server is unable to catch up
                setTimeout(() => { window.location.assign(window.location); }, 500);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleCustomerSubmit = (values, formik) => {
        axios.post('/profile', {
            id: props.currentUser.id,
            can: values.can,
            cvv: values.cvv
        }).then((response) => {
            if (response.data == false) {
                const message = "Could not update customer's credit card information!";
                console.log(message);
            } else {
                window.location.assign(window.location);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const displayInfoForm = (formik) => {
        return (
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Username
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Control
                            type="text"
                            name="username"
                            value={props.currentUser.username}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.username && !!formik.errors.username}
                            disabled={true}
                        />
                        <Form.Text className="text-muted">
                            Your username is permanent and cannot be changed.
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Email address
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Control
                            type="text"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.email && !!formik.errors.email}
                        />
                        <Form.Text className="text-muted">
                            Your email address is kept private and only used by us to contact you directly.
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Button type="submit">Update information</Button>
            </Form>
        )
    }

    const displayPasswordForm = (formik) => {
        return (
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Current password
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Control
                            type="password"
                            name="curPassword"
                            value={formik.values.curPassword}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.curPassword && !!formik.errors.curPassword}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        New password
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Control
                            type="password"
                            name="newPassword"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.newPassword && !!formik.errors.newPassword}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Confirm new password
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                        />
                    </Col>
                </Form.Group>

                <Button type="submit">Change password</Button>
            </Form>
        )
    }

    const displayForCustomer = () => {
        if (props.role == 'customer') {
            return (
                <React.Fragment>
                    <br />
                    <h4>Update credit card information</h4>
                    <Formik
                        validationSchema={validationCustomer}
                        initialValues={initialCustomerVals}
                        onSubmit={handleCustomerSubmit}
                    >
                        {(props) => displayCustomerForm(props)}
                    </Formik>
                </React.Fragment>
            )
        } else {
            return;
        }
    }

    const displayCustomerForm = (formik) => {
        return (
            <Form onSubmit={formik.handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formCan" sm={3}>
                        <Form.Label>
                            Credit card number
                        </Form.Label>
                        <Form.Control
                            type="tel"
                            name="can"
                            value={formik.values.can}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.can && !!formik.errors.can}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formCvv" sm={1}>
                        <Form.Label>
                            CVV
                        </Form.Label>
                        <Form.Control
                            type="password"
                            name="cvv"
                            value={formik.values.cvv}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.cvv && !!formik.errors.cvv}
                        />
                    </Form.Group>
                </Form.Row>

                <Button type="submit">Update credit card information</Button>
            </Form>
        )
    }

    return (
        <div className="p-3">
            <h2>Your profile</h2>
            <p>On this page, you can update your user information.</p>
            <Formik
                validationSchema={validation}
                initialValues={initialVals}
                onSubmit={handleSubmit}
            >
                {(props) => displayInfoForm(props)}
            </Formik>
            <br />
            <h4>Update password</h4>
            <Formik
                validationSchema={validationPassword}
                initialValues={initialPasswordVals}
                onSubmit={handlePasswordSubmit}
            >
                {(props) => displayPasswordForm(props)}
            </Formik>
            {displayForCustomer()}
        </div>
    )
};

export default Dashboard;
