import React from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../utilities/ConfirmationDialog';
import { getErrorMessage } from '../../helpers/FormHelpers';

const ToggleDish = (props) => {
    const deleteDish = () => {
        console.log(props.dish);

        const data = {
            toggle: {is_active: !props.dish.is_active}
        }

        axios.put(`/foods/deactivate/${props.dish.id}`, data)
            .then(result => {
                console.log(result);
                props.dish.is_active = !props.dish.is_active;

                console.log(props.dish);
                props.onDishDeactivated(props.dish);
            }).catch(error => {
                props.showFailureAlert(getErrorMessage(error));
            }).finally(() => {
                props.onClose();
            })
    }

    return (
        <ConfirmationDialog onConfirm={deleteDish} {...props}/>
    )
}

export default ToggleDish;