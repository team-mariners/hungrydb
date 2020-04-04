import React from 'react';
import axios from 'axios';
import Modal from '../../utilities/Modal';
import PromotionForm from './PromotionForm';
import { getProcessedPromotion, getErrorMessage } from '../../helpers/FormHelpers';

const NewPromotion = (props) => {
    const initialValues = {
        promoName: '',
        promocode: '',
        startDateTime: '',
        endDateTime: '',
        percentage: '',
        maxRedeem: '',
    };

    const createPromo = (values) => {
        console.log(values);
        const data = getProcessedPromotion(values);
        console.log(data);

        axios.post('/api/v1/promotions/promotions', data)        
        .then(result => {
            console.log(result);
            props.onPromoCreated(result.data);            
        }).catch(error => {
            console.log(error);
            props.showFailureAlert(getErrorMessage(error));
        }).finally(() => {
            props.onClose();
        })
    };

    return (
        <Modal {...props}>
            <h1>New Promotion</h1>
            <PromotionForm
                initialValues={initialValues}
                handleSubmit={createPromo}/>
        </Modal>
    )
};

export default NewPromotion;