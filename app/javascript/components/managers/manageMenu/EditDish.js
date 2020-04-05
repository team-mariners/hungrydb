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
            menuSection: null
        };
    } else {
        initialValues = {
            dishName: props.dish.f_name,
            price: props.dish.price,
            dailyLimit: props.dish.daily_limit,
            menuSection: props.dish.menu_section
        }
    }

    const editDish = (values) => {
        const data = getProcessedDishValues(values);

        axios.put(`/foods/${props.dish.id}`, data)
            .then(result => {
                console.log(result);
                props.onDishEdited(props.dish.id, result.data);
            }).catch(error => {
                props.showFailureAlert(getErrorMessage(error));
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