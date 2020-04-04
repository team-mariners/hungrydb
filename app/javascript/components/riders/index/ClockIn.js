import React from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../utilities/ConfirmationDialog';
import { getErrorMessage } from '../../helpers/FormHelpers';

const ClockIn = (props) => {
    const clockIn = () => {
        axios.post("/rider/clock_in")
            .then(result => {                
                const newClockInData = {...props.clockedInData};
                newClockInData.clock_in = result.data.clock_in;
                props.setClockedInData(newClockInData);
                props.showSuccessAlert("Clocked in!");
            }).catch(error => {
                console.log(error);
                props.showFailureAlert(getErrorMessage(error));
            }).finally(() => {
                props.onClose();
            });    
    }

    return (
        <ConfirmationDialog onConfirm={clockIn} {...props}/>    
    )
};

export default ClockIn;