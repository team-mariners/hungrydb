import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ClockIn from './ClockIn';
import ClockOut from './ClockOut';
import moment from 'moment-timezone';

const ToolBar = (props) => {
    const [isShowClockIn, showClockIn] = useState(false);
    const [isShowClockOut, showClockOut] = useState(false);

    const clockInTime = !props.clockedInData.clock_in
        ? "" 
        : moment(props.clockedInData.clock_in, "HH:mm").format("HH:mm a");

    const clockOutTime = !props.clockedInData.clock_out
        ? "" 
        : moment(props.clockedInData.clock_out, "HH:mm").format("HH:mm a");
   

    return (
        <div>
            <div className="mb-3">
                <Button
                    className="clock-in-out-button"
                    onClick={() => showClockIn(true)}
                    disabled={!!props.clockedInData.clock_in}>
                    Clock In
                </Button>            
                <span><b>Time: </b>{clockInTime}</span>
            </div>
            
            <div>
                <Button
                    className="clock-in-out-button"
                    onClick={() => showClockOut(true)}
                    disabled={!!props.clockedInData.clock_out}>
                    Clock Out
                </Button>
                <span><b>Time: </b>{clockOutTime}</span>
            </div>

            <ClockIn show={isShowClockIn} onClose={() => showClockIn(false)} {...props}/>
            <ClockOut show={isShowClockOut} onClose={() => showClockOut(false)} {...props}/>
        </div>      
    )
};

export default ToolBar;