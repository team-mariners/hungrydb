import React from 'react';
import axios from 'axios';
import Modal from '../../utilities/Modal';
import PromotionForm from './PromotionForm';
import { getProcessedPromotion, getErrorMessage } from '../../helpers/FormHelpers';

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

        console.log("HELLO");
        const data = getProcessedPromotion(values);
        console.log("BYE");

        axios.put(`/api/v1/promotions/promotions/${props.promotion.id}`, data)
            .then(result => {
                console.log(result);
                props.onPromoEdited(result.data);
            }).catch(error => {
                console.log(error);
                props.showFailureAlert(getErrorMessage(error));
            }).finally(() => {
                props.onClose();
            });
    };

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