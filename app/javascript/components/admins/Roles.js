import React, { useState } from 'react';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as Yup from 'yup';
import axios from 'axios';

const Roles = (props) => {
    const [manager, showManager] = useState(false);
    const [rider, showRider] = useState(false);

    const validation = Yup.object({
        username: Yup.string()
            .matches(/^\w+$/)
            .required(),
        role: Yup.string()
            .matches(/^\w+$/)
    });

    const initialVals = {
        username: (props.username == null) ? '' : props.username
    };

    const handleSubmit = (values, formik) => {
        if (values.hasOwnProperty("role") && values.role != '') {
            axios.post('/admin/updaterole', {
                userid: props.userid,
                oldrole: props.userrole,
                newrole: values.role
            }).then((response) => {
                if (response.data == false) {
                    const message = "Could not update the user's role!";
                    console.log(message);
                } else {
                    window.location.assign('/admin/roles');
                }
            }).catch((error) => {
                console.log(error);
            })
        } else {
            axios.post('/admin/getuserid', {
                username: values.username
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
        }

        formik.setSubmitting(false);
    }

    const handleChange = (event) => {
        if (event.target.value == "manager") {
            showRider(false);
            showManager(true);
        } else if (event.target.value == "rider") {
            showManager(false);
            showRider(true);
        } else {
            showManager(false);
            showRider(false);
        }
    }

    const displayUsername = (formik) => {return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group as={Row} controlId="formUsername">
                <Form.Label column sm={2}>
                    Enter a username:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.identifier && !!formik.errors.identifier}
                        disabled={props.userid != null}
                    />
                </Col>
                <Form.Control.Feedback type="invalid">Username is invalid.</Form.Control.Feedback>
            </Form.Group>
        </Form>
    )}

    const displayNewRole = (formik) => {
        if (props.userid != null) {
            const roles = props.rolesAvailable.filter((value, index, arr) => {
                return value != props.userrole;
            })
            roles.unshift("");
            const options = roles.map((value) => {
                return (<option value={value}>{value}</option>);
            })

            return (
            <Form.Group as={Row} controlId="formRole">
                <Form.Label column sm={2}>
                    Select new role:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control name="role" value={formik.values.role} onChange={handleChange} as="select">
                        {options}
                    </Form.Control>
                </Col>
            </Form.Group>
            )
        } else {
            return;
        }
    }

    const displayRoleSpecific = (formik) => {
        if (manager) {
            return (
                <p>Placeholder for assigning a restaurant</p>
            )
        } else if (rider) {
            return (
                <p>Placeholder for assigning a rider's schedule</p>
            )
        } else {
            return;
        }
    }

    const displaySubmitButton = (formik) => {
        return (
            <React.Fragment>
                <Button variant="primary" type="submit" disabled={formik.isSubmitting} sm={1}>
                    Go
                </Button>
                <span sm={1}>&nbsp;&nbsp;</span>
                <Button variant="secondary" sm={1} href="/admin/roles">
                    Cancel
                </Button>
            </React.Fragment>
        )
    }

    const displayForm = (formik) => {return (
        <Form onSubmit={formik.handleSubmit}>
            {displayUsername(formik)}
            {displayNewRole(formik)}
            {displayRoleSpecific(formik)}
            {displaySubmitButton(formik)}
        </Form>
    )}

    return (
        <React.Fragment>
            <h2>Roles management</h2>
            <Formik
                validationSchema={validation}
                initialValues={initialVals}
                onSubmit={handleSubmit}
            >
                {(props) => displayForm(props)}
            </Formik>
        </React.Fragment>
    )
};

export default Roles;
