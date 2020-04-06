import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import MonthPicker from '../utilities/MonthPicker';
import SalarySummaryTable from './stats/SalarySummaryTable';

const RiderStatistics = (props) => {
    const [month, setMonth] = useState(moment());
    const [summary, setSummary] = useState({});

    useEffect(() => {
        const dateFormat = "YYYY-MM-DD";
        // moment(month) is to clone the month as startOf is mutable
        const startDate = moment(month).startOf('month').format(dateFormat);
        const endDate = moment(startDate).endOf('month').format(dateFormat);

        axios.get(`/rider/monthly_salary_summary/?start_date=${startDate}&end_date=${endDate}`)
            .then(result => {
                console.log(result);
                setSummary(result.data);
            }).catch(error => {
                console.log(error);
            });
    }, [month]);    

    return (
        <div className="page">
            <h1>Salary Summary</h1>
            <MonthPicker
                month={month}
                setMonth={setMonth}/>
            <SalarySummaryTable
                summary={summary}/>
        </div>  
    );
};

export default RiderStatistics;
