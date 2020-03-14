import React from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../utilities/ConfirmationDialog';
import { getErrorMessage } from '../../helpers/FormHelpers';

const DeleteMenuSection = (props) => {
    const deleteSection = () => {
        axios.delete(`/menu_sections/${props.currMenuSectionId}`)
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
        <ConfirmationDialog onConfirm={deleteSection} {...props}/>
    )
};

export default DeleteMenuSection;