import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const ToolBar = (props) => {
    const clockIn = () => {
        axios.post("/rider/clock_in")
            .then(result => {                
                const newClockInData = {...props.clockedInData};
                newClockInData.clock_in = result.data.clock_in;
                props.setClockedInData(newClockInData);
            }).catch(error => {
                console.log(error);
            });    
    }

    const clockOut = () => {
        axios.post("/rider/clock_out")
            .then(result => {
                console.log(props);
                const newClockInData = {...props.clockedInData};
                newClockInData.clock_out = result.data.clock_out;
                props.setClockedInData(newClockInData);
            }).catch(error => {
                console.log(error);
            });
    }
    
    return (
        <div>
            <div className="mb-3">
                <Button className="clock-in-out-button" onClick={clockIn} disabled={!!props.clockedInData.clock_in}>
                    Clock In
                </Button>            
                <span><b>Time: </b>{props.clockedInData.clock_in}</span>
            </div>
            
            <div>
                <Button className="clock-in-out-button" onClick={clockOut} disabled={!!props.clockedInData.clock_out}>
                    Clock Out
                </Button>
                <span><b>Time: </b>{props.clockedInData.clock_out}</span>
            </div>
        </div>      
    )
};

export default ToolBar;