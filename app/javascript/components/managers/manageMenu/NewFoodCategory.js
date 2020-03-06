import React from 'react';
import axios from 'axios';
import Modal from '../../utilities/Modal';
import FoodCategoryForm from './FoodCategoryForm';
import { getProcessedFoodCategory, getErrorMessage } from '../../helpers/FormHelpers';

const NewFoodCategory = (props) => {
    const initialValues = {
        categoryName: ""
    };

    const createCategory = (values) => {
        console.log(values);
        const data = getProcessedFoodCategory(values);
       
        axios.post('/food_categories', data)
        .then(result => {
            console.log(result);
            props.onNewCategoryCreated(result.data);
        }).catch(error => {
            props.alerts.showFailureAlert(getErrorMessage(error));
        }).finally(() => {
            props.onClose();
        })
    };

    return (
        <Modal size="sm" {...props}>
            <h2>New Food Category</h2>
            <FoodCategoryForm 
                buttonName="Create"
                initialValues={initialValues}
                handleSubmit={createCategory}/>
        </Modal>
    )
};

export default NewFoodCategory;