import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { Formik } from 'formik';

/**
 * 
 * @param {*} props 
 * initialValues: initialvalues of the form.
 * handleSubmit: function which handles submission of the form.
 * buttonName: name of the submit button
 */
const DishForm = (props) => {
    const schema = yup.object({
        dishName: yup.string().matches(/^[\w\s]+$/).required(),
        price: yup.number().min(0).required(),
        dailyLimit: yup.number().integer().min(0).required()
    });

    return (
        <Formik
            validationSchema={schema}
            onSubmit={props.handleSubmit}
            initialValues={props.initialValues}
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
                                isInvalid={touched.dailyLimit && !!errors.dailyLimit} />
                            <Form.Text className="text-muted">
                                Daily limit is required and must be greater or equal to 0.
                                </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Daily limit is invalid.
                                </Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit">{props.buttonName}</Button>
                    </Form>
                )}
        </Formik>
    )
};

export default DishForm;