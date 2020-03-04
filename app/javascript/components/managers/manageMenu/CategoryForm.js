import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { Formik } from 'formik';

const CategoryForm = (props) => {
    const schema = yup.object({
        categoryName: yup.string().required()
    });

    return (
        <Formik
            validationSchema={schema}
            initialValues={props.initialValues}
            onSubmit={props.handleSubmit}
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
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="categoryName"
                            value={values.categoryName}
                            onChange={handleChange}/>
                    </Form.Group>
                    <Button type="submit">{props.buttonName}</Button>
                </Form>
            )}
        </Formik>
    )
};

export default CategoryForm;