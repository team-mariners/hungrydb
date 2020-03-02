import React from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../utilities/ConfirmationDialog';

const DeleteDish = (props) => {
    const deleteDish = () => {
        console.log(props.dishId);
        axios.delete(`/foods/${props.dishId}`)
            .then(result => {
                console.log(result);
                props.onDishDeleted(props.dishId);
            }).catch(error => {
                props.alerts.showFailureAlert(error.message);
            }).finally(() => {
                props.onClose();
            })
    }

    return (
        <ConfirmationDialog onConfirm={deleteDish} {...props}/>
    )
}

export default DeleteDish;