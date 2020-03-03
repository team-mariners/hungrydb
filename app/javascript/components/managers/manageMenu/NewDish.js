import React from 'react';
import axios from 'axios';
import Modal from '../../utilities/Modal';
import DishForm from './DishForm';
import { getProcessedDishValues } from '../../helpers/FormHelpers';

const csrfToken = document.querySelector('[name=csrf-token').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

/**
 * 
 * @param {*} props 
 * show: visibility of the newdish dialog.
 * onClose: function which is executed upon clicking the close button of the newDish dialog.
 * onDishCreated: function which is executed when a new dish is created.
 */
const NewDish = (props) => {
    const initialValues = {
        dishName: "",
        price: "",
        dailyLimit: ""
    };

    const handleSubmit = (values) => {
        const data = getProcessedDishValues(values);
       
        console.log(data);
        axios.post('/foods',data)
            .then((result) => {                
                console.log(result);
                props.onDishCreated(result.data);
            }).catch((error) => {
                let message = "";
                if (error.response != undefined) {
                    message = error.response.data.errors;
                } else {
                    message = error.message;
                }
                props.alerts.showFailureAlert(message);
            }).finally(() => {
                props.onClose();
            });
    };

    return (
        <Modal show={props.show} onClose={props.onClose}>
            <h1>New Dish</h1>
            <DishForm
                initialValues={initialValues}
                handleSubmit={handleSubmit}
                buttonName="Create"/>
        </Modal>
    )
};

export default NewDish;