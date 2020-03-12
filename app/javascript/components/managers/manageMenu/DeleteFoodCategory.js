import React from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../utilities/ConfirmationDialog';
import { getErrorMessage } from '../../helpers/FormHelpers';

const DeleteFoodCategory = (props) => {
    const deleteCategory = () => {
        axios.delete(`/food_categories/${props.currFoodCategoryId}`)
        .then(result => {
            console.log(result);
            props.onCategoryDeleted(props.currFoodCategoryId);
        }).catch(error => {
            props.alerts.showFailureAlert(getErrorMessage(error));
        }).finally(() => {
            props.onClose();
        })
    };

    return (
        <ConfirmationDialog onConfirm={deleteCategory} {...props}/>
    )
};

export default DeleteFoodCategory;