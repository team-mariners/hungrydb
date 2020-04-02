import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimeRecorder from './index/TimeRecorder';

const DashBoard = (props) => {
    const [clockedInData, setClockedInData] = useState({
        id: null,
        date: null,
        clock_in: null,
        clock_out: null}
    );

    useEffect(() => {
        axios.get('/rider/check_clocked_in')
        .then(result => {
            console.log(result);
            if (!!result.data) {
                setClockedInData(result.data);
            }
        }).catch(error => {
            console.log(error);
        });    
    }, []);

    return (
        <div className="p-3">
            <h1>Hello {props.current_user.username}!</h1>
            <TimeRecorder
                clockedInData={clockedInData}
                setClockedInData={setClockedInData}/>                
        </div>
    )
};

export default DashBoard;