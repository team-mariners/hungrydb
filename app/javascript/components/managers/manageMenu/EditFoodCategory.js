import React from 'react';
import axios from 'axios';
import Modal from '../../utilities/Modal';
import FoodCategoryForm from './FoodCategoryForm';
import { getProcessedFoodCategory, getErrorMessage } from '../../helpers/FormHelpers';

const EditFoodCategory = (props) => {
    const currFoodCategory = props.getCurrentFoodCategory();
    let initialValues = {};

    if (!!currFoodCategory) {
        initialValues = { categoryName: currFoodCategory.ms_name };
    } else {
        initialValues = { categoryName: "" }; 
    }

    const editCategory = (values) => {
        const data = getProcessedFoodCategory(values);
        axios.put(`/food_categories/${currFoodCategory.url_id}`, data)
            .then(result => {
                console.log(result);
                props.onCategoryEdited(result.data);
            }).catch(error => {
                props.alerts.showFailureAlert(getErrorMessage(error));
            }).finally(() => {
                props.onClose();
            })
    };

    return (
        <Modal size="sm" {...props}>
            <h2>Edit Food Category</h2>
            <FoodCategoryForm
                buttonName="Submit"
                initialValues={initialValues}
                handleSubmit={editCategory}/>
        </Modal>
    )
};

export default EditFoodCategory;