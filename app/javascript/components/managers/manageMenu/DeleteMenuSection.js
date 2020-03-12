import React from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../utilities/ConfirmationDialog';
import { getErrorMessage } from '../../helpers/FormHelpers';

const DeleteMenuSection = (props) => {
    const deleteCategory = () => {
        axios.delete(`/food_categories/${props.currMenuSectionId}`)
        .then(result => {
            console.log(result);
            props.onMenuSectionDeleted(props.currMenuSectionId);
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

export default DeleteMenuSection;