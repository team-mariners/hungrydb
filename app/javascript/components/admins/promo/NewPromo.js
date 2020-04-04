import React from 'react';
import Modal from '../../utilities/Modal';
import axios from 'axios';
import PromoForm from './PromoForm';

const NewPromo = (props) => {
    const initialVals = {
        promoName: '',
        promoCode: '',
        startDateTime: '',
        endDateTime: '',
        percentage: '',
        maxRedeem: '',
    };

    const handleSubmit = (values, formik) => {
        axios.post('/admin/fdspromo', {
            func: 'new',
            name: values.promoName,
            code: values.promoCode,
            start: values.startDateTime,
            end: values.endDateTime,
            percent: values.percentage,
            max: values.maxRedeem
        }).then((response) => {
            if (response.data == false) {
                const message = "Could not create a new FDS promotion!";
                console.log(message);
            } else {
                props.onPromoCreated();
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
            <h2>New Promotion</h2>
            <PromoForm
                isEditing={false}
                initialVals={initialVals}
                handleSubmit={handleSubmit}
            />
        </Modal>
    )
};

export default NewPromo;
