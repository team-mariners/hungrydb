import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import DateTime from 'react-datetime';
import { dateTimeFormat } from '../../utilities/Constants';
import moment from 'moment-timezone';
import * as Yup from 'yup';

const PromoForm = (props) => {
    const validation = Yup.object({
        promoName: Yup.string()
            .max(300)
            .required(),
        promoCode: Yup.string()
            .max(200)
            .required(),
        startDateTime: Yup.date()
            .required(),
        endDateTime: Yup.date()
            .min(Yup.ref('startDateTime'))
            .required(),
        percentage: Yup.number()
            .min(0)
            .max(100)
            .required(),
        maxRedeem: Yup.number()
            .min(0)
            .required()
    });

    const initialStart = (props.initialVals.startDateTime == '') ? '' : moment(props.initialVals.startDateTime).format(dateTimeFormat);
    const initialEnd = (props.initialVals.endDateTime == '') ? '' : moment(props.initialVals.endDateTime).format(dateTimeFormat);

    const submitButtonText = (props.isEditing) ? "Save" : "Create";
    const isDisableStartDate = props.isEditing === true && moment(props.initialVals.startDateTime).isBefore(moment());

    // Enable minimum startDateTime check if the startDateTime field is not disabled
    if (!isDisableStartDate) {
        validation.fields.startDateTime = validation.fields.startDateTime.min(new Date());
    }

    const displayForm = (formik) => {
        return (
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label>Promotion Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="promoName"
                        value={formik.values.promoName}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.promoName && !!formik.errors.promoName}
                        disabled={props.isEditing}
                    />
                    <Form.Text className="text-muted">
                        Required, maximum of 300 characters allowed
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Promo Code</Form.Label>
                    <Form.Control
                        type="text"
                        name="promoCode"
                        value={formik.values.promoCode}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.promoCode && !!formik.errors.promoCode}
                        disabled={props.isEditing}
                    />
                    <Form.Text className="text-muted">
                        Required, maximum of 200 characters allowed
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Start Date and Time</Form.Label>
                    <DateTime
                        inputProps={{
                            name: "startDateTime",
                            onBlur: formik.handleBlur,
                            className: formik.touched.startDateTime && formik.submitCount > 0 && !!formik.errors.startDateTime
                                ? "form-control is-invalid"
                                : "form-control",
                            disabled: isDisableStartDate
                        }}
                        dateFormat='MMMM Do YYYY,'
                        value={initialStart}
                        onChange={(moment) => formik.setFieldValue('startDateTime', moment)}
                    />
                    <Form.Text className="text-muted">
                        Required, date and time cannot be in the past
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>End Date and Time</Form.Label>
                    <DateTime
                        inputProps={{
                            name: "endDateTime",
                            onBlur: formik.handleBlur,
                            className: formik.touched.endDateTime && formik.submitCount > 0 && !!formik.errors.endDateTime
                                ? "form-control is-invalid"
                                : "form-control"
                        }}
                        dateFormat='MMMM Do YYYY,'
                        value={initialEnd}
                        onChange={(moment) => formik.setFieldValue('endDateTime', moment)}
                    />
                    <Form.Text className="text-muted">
                        Required, ending date and time cannot be before start date and time
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Percentage (%)</Form.Label>
                    <Form.Control
                        type="text"
                        name="percentage"
                        value={formik.values.percentage}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.percentage && !!formik.errors.percentage}
                    />
                    <Form.Text className="text-muted">
                        Required, value must be an integer, e.g. 10
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Maximum Redeem</Form.Label>
                    <Form.Control
                        type="text"
                        name="maxRedeem"
                        value={formik.values.maxRedeem}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.maxRedeem && !!formik.errors.maxRedeem}/>
                    <Form.Text className="text-muted">
                        Required, value must be an integer
                    </Form.Text>
                </Form.Group>

                <Button type="submit">{submitButtonText}</Button>
            </Form>
        )
    }

    return (
        <Formik
            validationSchema={validation}
            initialValues={props.initialVals}
            onSubmit={props.handleSubmit}
        >
            {(props) => displayForm(props)}
        </Formik>
    )
}

export default PromoForm;