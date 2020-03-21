import React from 'react';
import axios from 'axios';
import Modal from '../../utilities/Modal';
import MenuSectionForm from './MenuSectionForm';
import { getProcessedMenuSection, getErrorMessage } from '../../helpers/FormHelpers';

const EditMenuSection = (props) => {
    const currMenuSection = props.getCurrentMenuSection();
    let initialValues = {};

    if (!!currMenuSection) {
        initialValues = { sectionName: currMenuSection.ms_name };
    } else {
        initialValues = { sectionName: "" }; 
    }

    const editSection = (values) => {
        const data = getProcessedMenuSection(values);
        axios.put(`/menu_sections/${currMenuSection.url_id}`, data)
            .then(result => {
                console.log(result);
                props.onMenuSectionEdited(result.data);
            }).catch(error => {
                props.alerts.showFailureAlert(getErrorMessage(error));
            }).finally(() => {
                props.onClose();
            })
    };

    return (
        <Modal size="sm" {...props}>
            <h2>Edit Menu Section</h2>
            <MenuSectionForm
                buttonName="Submit"
                initialValues={initialValues}
                handleSubmit={editSection}/>
        </Modal>
    )
};

export default EditMenuSection;