import React from 'react';
import axios from 'axios';
import Modal from '../../utilities/Modal';
import DishForm from './DishForm';

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
    }

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