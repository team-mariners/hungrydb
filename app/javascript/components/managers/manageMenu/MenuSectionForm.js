import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { Formik } from 'formik';

/**
 * 
 * @param {*} props 
 * buttonName: text to be displayed on the submit button.
 * initiaValues: an object containing these key-value pairs: sectionName.
 * handleSubmit: a function which handles the submit action of the form.
 */
const MenuSectionForm = (props) => {
    const schema = yup.object({
        sectionName: yup.string().max(100).required()
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
                            name="sectionName"
                            value={values.sectionName}
                            onChange={handleChange}
                            isInvalid={touched.sectionName && !!errors.sectionName}/>
                        <Form.Text className="text-muted">
                            Maximum 100 characters.
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            Menu section is invalid.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">{props.buttonName}</Button>
                </Form>
            )}
        </Formik>
    )
};

export default MenuSectionForm;