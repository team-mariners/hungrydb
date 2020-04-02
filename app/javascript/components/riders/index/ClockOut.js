import React from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../utilities/ConfirmationDialog';

const ClockOut = (props) => {
    const clockOut = () => {
        axios.post("/rider/clock_out")
            .then(result => {
                const newClockInData = {...props.clockedInData};
                newClockInData.clock_out = result.data.clock_out;
                newClockInData.total_hours = result.data.total_hours;
                props.setClockedInData(newClockInData);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                props.onClose();
            });
    }

    return (
        <ConfirmationDialog onConfirm={clockOut} {...props}/>
    )
};

export default ClockOut;