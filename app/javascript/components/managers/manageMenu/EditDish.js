import React from 'react';
import axios from 'axios';
import Modal from '../../utilities/Modal';
import DishForm from './DishForm';
import { getProcessedDishValues } from '../../helpers/FormHelpers';

const EditDish = (props) => {
    let initialValues = null; 
    if (props.dish == null) {
        initialValues = {
            dishName: "",
            price: "",
            dailyLimit: ""
        };
    } else {
        initialValues = {
            dishName: props.dish.name,
            price: props.dish.price,
            dailyLimit: props.dish.dailyLimit
        }
    }

    const editDish = (values) => {
        const data = getProcessedDishValues(values);

        axios.put(`/foods/${props.dish.id}`, data)
            .then(result => {
                console.log(result);
                props.onDishEdited(props.dish.id, result.data);
            }).catch(error => {
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
        <Modal {...props}>
            <h1>Edit Dish</h1>
            <DishForm
                initialValues={initialValues}
                handleSubmit={editDish}
                buttonName="Submit"/>
        </Modal>
    )
};

export default EditDish;