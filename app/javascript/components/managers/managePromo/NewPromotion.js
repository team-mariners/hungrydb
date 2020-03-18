import React from 'react';
import Modal from '../../utilities/Modal';
import PromotionForm from './PromotionForm';

const NewPromotion = (props) => {
    const initialValues = {
        promoName: '',
        promoCode: '',
        startDateTime: '',
        endDateTime: '',
        percentage: '',
        maxRedeem: '',
    };

    const createPromo = (values) => {
        console.log(values);
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