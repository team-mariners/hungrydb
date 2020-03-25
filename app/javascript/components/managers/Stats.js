import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MonthPicker from './summary/MonthPicker';
import MonthSummary from './summary/MonthSummary';
import moment from 'moment-timezone';

const Stats = () => {
    const [month, setMonth] = useState(moment());
    const MONTH_FORMAT = "MMMM, YYYY";    

    const [summary, setSummary] = useState({
        total_orders: null,
        popular_dishes: []
    });
    
    useEffect(() => {
        const dateFormat = "YYYY-MM-DD";
        const startDate = moment(month).startOf('month').format(dateFormat);
        const endDate = moment(startDate).endOf('month').format(dateFormat);

        axios.get(`/api/v1/statistics/monthy_overall_summary/?startDate=${startDate}&endDate=${endDate}`)
        .then((result) => {
            console.log(result);
            setSummary(result.data);
        }).catch((error) => {
            console.log(error);
        })

    }, [month]);


    return (
        <div className="p-3">
            <h1>{month.format(MONTH_FORMAT)}</h1>                        
            <MonthPicker
                className="my-3"
                month={month}
                setMonth={setMonth}/>
            <MonthSummary
                summary={summary}/>
        </div>
    )
};

export default Stats;