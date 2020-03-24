import React, { useState } from 'react';
import MonthPicker from './summary/MonthPicker';
import MonthSummary from './summary/MonthSummary';
import moment from 'moment-timezone';

const Stats = () => {
    const [month, setMonth] = useState(moment());
    const MONTH_FORMAT = "MMMM, YYYY";

    return (
        <div className="p-3">
            <h1>{month.format(MONTH_FORMAT)}</h1>                        
            <MonthPicker
                className="my-3"
                month={month}
                setMonth={setMonth}/>
            <MonthSummary/>
        </div>
    )
};

export default Stats;