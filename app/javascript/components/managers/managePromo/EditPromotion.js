import React from 'react';
import Modal from '../../utilities/Modal';
import PromotionForm from './PromotionForm';

const EditPromotion = (props) => {
    console.log(props);

    // For the initial loading of the page
    if (!props.promotion) {
        return null;
    }

    const initialValues = {
        promoName: props.promotion.p_name,
        promocode: props.promotion.promocode,
        startDateTime: props.promotion.start_datetime,
        endDateTime: props.promotion.end_datetime,
        percentage: props.promotion.percentage,
        maxRedeem: props.promotion.max_redeem,
    };

    const editPromo = (values) => {
        console.log(values);
    }

    return (
        <Modal {...props}>
            <h1>Edit Promotion</h1>
            <PromotionForm
                initialValues={initialValues}
                handleSubmit={editPromo}
                isEdit={true}/>
        </Modal>
    )
};

export default EditPromotion;