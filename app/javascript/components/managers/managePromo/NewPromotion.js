import React from 'react';
import Modal from '../../utilities/Modal';
import PromotionForm from './PromotionForm';
import { getProcessedPromotion } from '../../helpers/FormHelpers';

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