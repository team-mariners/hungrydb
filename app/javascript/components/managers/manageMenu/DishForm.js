import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Typeahead } from 'react-bootstrap-typeahead';

/**
 * 
 * @param {*} props 
 * initialValues: initialvalues of the form.
 * handleSubmit: function which handles submission of the form.
 * buttonName: name of the submit button
 * foodCategories: an array of all the foodCategories created by the user.
 */
const DishForm = (props) => {
    const schema = yup.object({
        dishName: yup.string().max(100).required(),
        price: yup.number().min(0).required().test(
            'Two Decimal Places Test',
            'Price cannot have more than 2 decimal places',
            value => {
                const remainder = value * 100 - Math.floor(value * 100);
                const isMaxTwoDp = remainder === 0;
                return isMaxTwoDp;
            }
        ),
        dailyLimit: yup.number().integer().min(0).required(),
        foodCategory: yup.object().required()
    });

    console.log(props.initialValues);

    const initialValues = { ...props.initialValues };
    initialValues.foodCategory = null;

    // useEffect(() => {
    //     initialValues.foodCategory = props.initialValues.foodCategory
    // }, [])

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
                isSubmitting,
                setFieldValue,
                setFieldTouched,
                submitCount,
                handleBlur
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
                                Dish name is required and can only be a maximum of 100 characters.
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
                                Price is required, must be greater or equal to 0, and can only have 2 decimal places.
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

                        <Form.Group>
                            <Form.Label>Dish Category</Form.Label>
                            {/* Update the condition of the conditional rendering of the feedback component if you are
                                changing the invalid condition of Typeahead too! */}
                            <Typeahead
                                id="food-category-typeahead"
                                name="foodCategory"
                                labelKey="name"
                                options={props.foodCategories}
                                selected={!!values.foodCategory ? [values.foodCategory] : []}
                                isInvalid={touched.foodCategory && !!errors.foodCategory}
                                onChange={(selected) => setFieldValue('foodCategory', selected[0])}
                                onBlur={() => {setFieldTouched('foodCategory', true)}}
                            />
                            <Form.Text className='text-muted'>
                                Dish category is required and need to be created first.
                            </Form.Text>
                            <Form.Text className='text-danger'
                                style={touched.foodCategory && !!errors.foodCategory ? {} : { display: "none" }}>
                                Dish category is invalid.
                            </Form.Text>
                        </Form.Group>

                        <Button type="submit">{props.buttonName}</Button>
                    </Form>
                )}
        </Formik>
    )
};

export default DishForm;