import React from 'react';
import axios from 'axios';
import Modal from '../../utilities/Modal';
import DishForm from './DishForm';
import { getProcessedDishValues, getErrorMessage } from '../../helpers/FormHelpers';

const EditDish = (props) => {
    let initialValues = null; 
    if (props.dish == null) {
        initialValues = {
            dishName: "",
            price: "",
            dailyLimit: "",
            foodCategory: null
        };
    } else {
        initialValues = {
            dishName: props.dish.name,
            price: props.dish.price,
            dailyLimit: props.dish.dailyLimit,
            foodCategory: props.dish.foodCategory
        }
    }

    const editDish = (values) => {
        const data = getProcessedDishValues(values);

        axios.put(`/foods/${props.dish.id}`, data)
            .then(result => {
                console.log(result);
                props.onDishEdited(props.dish.id, result.data);
            }).catch(error => {
                props.alerts.showFailureAlert(getErrorMessage(error));
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
                buttonName="Submit"
                {...props}/>
        </Modal>
    )
};

export default EditDish;