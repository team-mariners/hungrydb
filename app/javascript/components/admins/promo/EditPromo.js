import React from 'react';
import Modal from '../../utilities/Modal';
import axios from 'axios';
import PromoForm from './PromoForm';

const EditPromo = (props) => {
    if (!props.promo) {
        return null;
    }

    const initialVals = {
        promoName: props.promo.p_name,
        promoCode: props.promo.promocode,
        startDateTime: props.promo.start_datetime,
        endDateTime: props.promo.end_datetime,
        percentage: props.promo.percentage,
        maxRedeem: props.promo.max_redeem,
    };

    const handleSubmit = (values, formik) => {
        axios.post('/admin/fdspromo', {
            func: 'edit',
            code: values.promoCode,
            start: new Date(values.startDateTime),
            end: new Date(values.endDateTime),
            percent: values.percentage,
            max: values.maxRedeem
        }).then((response) => {
            if (response.data == false) {
                const message = "Could not edit the FDS promotion!";
                console.log(message);
            } else {
                props.onPromoEdited();
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <Modal
            show={props.show}
            onClose={props.onClose}
        >
            <h2>Edit Promotion</h2>
            <PromoForm
                isEditing={true}
                initialVals={initialVals}
                handleSubmit={handleSubmit}
            />
        </Modal>
    )
};

export default EditPromo;
