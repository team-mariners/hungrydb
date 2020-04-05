import React, { useState } from 'react';
import moment from 'moment-timezone';
import MonthPicker from '../utilities/MonthPicker';
import SalarySummaryTable from './stats/SalarySummaryTable';

const RiderStatistics = (props) => {
    const [month, setMonth] = useState(moment());

    console.log(props);

    return (
        <div className="page">
            <h1>Salary Summary</h1>
            <MonthPicker
                month={month}
                setMonth={setMonth}/>
            <SalarySummaryTable/>
        </div>  
    );
};

export default RiderStatistics;
