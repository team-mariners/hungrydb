import React from 'react';
import axios from 'axios';
import Modal from '../../utilities/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { Formik } from 'formik';

const csrfToken = document.querySelector('[name=csrf-token').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

const NewDish = (props) => {
    const schema = yup.object({
        dishName: yup.string().matches(/^[\w\s]+$/).required(),
        price: yup.number().min(0).required(),
        dailyLimit: yup.number().integer().min(0).required()
    });

    const formInitialValues = {
        dishName: "",
        price: "",
        dailyLimit: ""
    };

    const handleSubmit = (values) => {
        const data = {
            food: {
                name: values.dishName.trim(),
                price: parseFloat(values.price),
                dailyLimit: parseInt(values.dailyLimit)
            } 
        };

        console.log(data);
        axios.post('/foods',data)
            .then((result) => {
                console.log(result);
            }).catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <Modal show={props.show} onClose={props.onClose}>
            <h1>New Dish</h1>
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={formInitialValues}
            >
                {({ handleSubmit,
                    handleChange,
                    values,
                    errors,
                    touched,
                    isSubmitting
                }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Dish Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="dishName"
                                    value={values.dishName}
                                    onChange={handleChange}
                                    isInvalid={touched.dishName && !!errors.dishName} />
                                <Form.Text className="text-muted">
                                    Dish name is required and can only be alphanumeric.
                            </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    Dish name is invalid.
                            </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Price ($)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    isInvalid={touched.price && !!errors.price} />
                                <Form.Text className="text-muted">
                                    Price is required and must be greater or equal to 0.
                            </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    Price is invalid.
                            </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Daily Maximum Limit (quantity)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="dailyLimit"
                                    value={values.dailyLimit}
                                    onChange={handleChange}
                                    isInvalid={touched.dailyLimit && !!errors.dailyLimit}/>
                                <Form.Text className="text-muted">
                                    Daily limit is required and must be greater or equal to 0.
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    Daily limit is invalid.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit">Create</Button>
                        </Form>
                    )}
            </Formik>
        </Modal>
    )
};

export default NewDish;