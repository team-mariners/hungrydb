import React from 'react';
import { Formik } from 'formik';
import moment from 'moment-timezone';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DateTime from 'react-datetime';
import * as yup from 'yup';

const PromotionForm = (props) => {
    const schema = yup.object({
        promoName: yup.string().max(300).required(),
        promoCode: yup.string().max(200).required(),
        startDateTime: yup.date().min(new Date()).required(),
        endDateTime: yup.date().min(yup.ref('startDateTime')).required(),
        percentage: yup.number().integer().min(0).max(100).required(),
        maxRedeem: yup.number().integer().min(0).required(),
    });

    return (
        <Formik
            initialValues={props.initialValues}
            validationSchema={schema}
            onSubmit={props.handleSubmit}
        >
            {({ handleSubmit,
                handleChange,
                values,
                errors,
                touched,
                setFieldValue,
                handleBlur,
                submitCount
            }) => (
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control                        
                        type="text"
                        name="promoName"
                        value={values.promoName}
                        onChange={handleChange}
                        isInvalid={touched.promoName && !!errors.promoName}/>
                    <Form.Text className="text-muted">
                        Required and maximum 300 characters
                    </Form.Text>                    
                </Form.Group>

                <Form.Group>
                    <Form.Label>Promo Code</Form.Label>
                    <Form.Control
                        type="text"
                        name="promoCode"
                        value={values.promoCode}
                        onChange={handleChange}
                        isInvalid={touched.promoCode && !!errors.promoCode}/>
                <Form.Text className="text-muted">
                        Required and maximum 200 characters
                </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Start Date and Time</Form.Label>
                    <DateTime           
                        inputProps={{ 
                            name: "startDateTime",
                            onBlur: handleBlur,
                            className: touched.startDateTime && submitCount > 0 && !!errors.startDateTime 
                                ? "form-control is-invalid"
                                : "form-control" 
                        }}                                 
                        onChange={(moment) => setFieldValue('startDateTime', moment)}/>
                    <Form.Text className="text-muted">
                        Required and cannot be in the past.
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>End Date and Time</Form.Label>
                    <DateTime
                        inputProps={{ 
                            name: "endDateTime",
                            onBlur: handleBlur,
                            className: touched.endDateTime && submitCount > 0 && !!errors.endDateTime 
                                ? "form-control is-invalid"
                                : "form-control" 
                        }}                           
                        onChange={(moment) => setFieldValue('endDateTime', moment)}/>
                    <Form.Text className="text-muted">
                        Required
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Percentage (%)</Form.Label>
                    <Form.Control
                        type="text"
                        name="percentage"
                        value={values.percentage}
                        onChange={handleChange}
                        isInvalid={touched.percentage && !!errors.percentage}/>
                    <Form.Text className="text-muted">
                        Required and can only be integer, e.g. 10
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Maximum Redeem</Form.Label>
                    <Form.Control
                        type="text"
                        name="maxRedeem"
                        value={values.maxRedeem}
                        onChange={handleChange}
                        isInvalid={touched.maxRedeem && !!errors.maxRedeem}/>
                    <Form.Text className="text-muted">
                        Required and can only be integer
                    </Form.Text>
                </Form.Group>

                <Button type="submit">Create</Button>
            </Form>
            )}
        </Formik>
    )
};

export default PromotionForm;