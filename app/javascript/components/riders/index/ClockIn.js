import React from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../utilities/ConfirmationDialog';

const ClockIn = (props) => {
    const clockIn = () => {
        axios.post("/rider/clock_in")
            .then(result => {                
                const newClockInData = {...props.clockedInData};
                newClockInData.clock_in = result.data.clock_in;
                props.setClockedInData(newClockInData);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                props.onClose();
            });    
    }

    return (
        <ConfirmationDialog onConfirm={clockIn} {...props}/>    
    )
};

export default ClockIn;