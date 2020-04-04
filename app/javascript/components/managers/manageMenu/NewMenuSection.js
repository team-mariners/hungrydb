import React from 'react';
import axios from 'axios';
import Modal from '../../utilities/Modal';
import MenuSectionForm from './MenuSectionForm';
import { getProcessedMenuSection, getErrorMessage } from '../../helpers/FormHelpers';

const NewMenuSection = (props) => {
    const initialValues = {
        sectionName: ""
    };

    const createSection = (values) => {
        console.log(values);
        const data = getProcessedMenuSection(values);
       
        axios.post('/menu_sections', data)
        .then(result => {
            console.log(result);
            props.onNewMenuSectionCreated(result.data);
        }).catch(error => {
            props.showFailureAlert(getErrorMessage(error));
        }).finally(() => {
            props.onClose();
        })
    };

    return (
        <Modal size="sm" {...props}>
            <h2>New Menu Section</h2>
            <MenuSectionForm 
                buttonName="Create"
                initialValues={initialValues}
                handleSubmit={createSection}/>
        </Modal>
    )
};

export default NewMenuSection;