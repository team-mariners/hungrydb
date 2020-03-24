import React from 'react';
import DatePicker from './summary/DatePicker';
import MonthSummary from './summary/MonthSummary';

const Stats = () => {
    return (
        <div className="p-3">
            <h1>March, 2020</h1>                        
            <DatePicker className="my-3"/>
            <MonthSummary/>
        </div>
    )
};

export default Stats;