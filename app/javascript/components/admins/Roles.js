import React, { useState } from 'react';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as Yup from 'yup';
import axios from 'axios';

const Roles = (props) => {
    const [manager, showManager] = useState(false);
    const [rider, showRider] = useState(false);
    const [role, setRole] = useState(props.userrole);

    const existingRestaurant = props.existingRestaurant;

    const validation = Yup.object({
        username: Yup.string()
            .matches(/^\w+$/)
            .required(),
        role: Yup.string()
            .matches(/^\w+$/),
        rname: Yup.string(),
        rmincost: Yup.number().min(0),
        raddress: Yup.string()
    });

    const initialVals = {
        username: (props.username == null) ? '' : props.username,
        rname: (existingRestaurant == null) ? '' : existingRestaurant.name,
        rmincost: (existingRestaurant == null) ? 0.00 : existingRestaurant.min_order_cost,
        raddress: (existingRestaurant == null) ? '' : existingRestaurant.address
    };

    const handleSubmit = (values, formik) => {
        if (role != props.userrole) {
            var rolespecific = {};

            if (role == 'manager') {
                rolespecific = {
                    rupdate: (existingRestaurant == null),
                    rname: values.rname,
                    rmincost: values.rmincost,
                    raddress: values.raddress
                }
            }

            axios.post('/admin/updaterole', {
                userid: props.userid,
                oldrole: props.userrole,
                newrole: role,
                roleattr: rolespecific
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
        setRole(event.target.value);

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
                <React.Fragment>
                    <Form.Group as={Row} controlId="formRestaurantTitle">
                        <Form.Label column sm={4}>
                            <h3>Create a new restaurant</h3>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formRestaurantName">
                        <Form.Label column sm={2}>
                            Name of restaurant:
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control
                                type="text"
                                name="rname"
                                value={formik.values.rname}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.identifier && !!formik.errors.identifier}
                                disabled={existingRestaurant != null}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formRestaurantMinOrderCost">
                        <Form.Label column sm={2}>
                            Minimum order cost:
                        </Form.Label>
                        <Col sm={3}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="number"
                                name="rmincost"
                                value={formik.values.rmincost}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.identifier && !!formik.errors.identifier}
                                disabled={existingRestaurant != null}
                            />
                        </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formRestaurantAddress">
                        <Form.Label column sm={2}>
                            Restaurant address:
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control
                                type="text"
                                name="raddress"
                                value={formik.values.raddress}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.identifier && !!formik.errors.identifier}
                                disabled={existingRestaurant != null}
                            />
                        </Col>
                    </Form.Group>
                </React.Fragment>
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
