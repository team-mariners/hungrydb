import React from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../utilities/ConfirmationDialog';

const UpdateTime = (props) => {
    const updateTime = () => {
        axios.post(`/rider/update_time/${props.id}`)
            .then(result => {
                console.log(result);
                props.onTimeUpdated(props.id, result.data);                
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                props.onClose();
            });
    };

    return (
        <ConfirmationDialog onConfirm={updateTime} {...props}/>
    )
};

export default UpdateTime;