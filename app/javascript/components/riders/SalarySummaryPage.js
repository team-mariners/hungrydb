import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import MonthPicker from '../utilities/MonthPicker';
import SalarySummaryTable from './stats/SalarySummaryTable';
import WeekPicker from '../utilities/WeekPicker';

const SalarySummaryPage = (props) => {
    const now = moment();
    const [month, setMonth] = useState(now);
    const [week, setWeek] = useState(now);
    const [weeks, setWeeks] = useState([]);
    const [summary, setSummary] = useState({});

    const isFullTime = "full_time".localeCompare(props.info.r_type) === 0;
    const isPartTime = "part_time".localeCompare(props.info.r_type) === 0;

    const loadData = () => {
        const dateFormat = "YYYY-MM-DD";
        let startDate = null;
        let endDate = null;

        if (isFullTime) {
            // moment(month) is to clone the month as startOf is mutable
            startDate = moment(month).startOf('month').format(dateFormat);
            endDate = moment(startDate).endOf('month').format(dateFormat);
        } else if (isPartTime) {
            startDate = moment(week).format(dateFormat);
            endDate = moment(week).endOf('week').add(1, 'days').format(dateFormat);            
        }

        axios.get(`/rider/fetch_salary_summary/?start_date=${startDate}&end_date=${endDate}`)
            .then(result => {
                console.log(result);
                setSummary(result.data);
            }).catch(error => {
                console.log(error);
            });
    };

    let weekPicker = null;    
    if (isFullTime) {
        // Fetch monthly summary
        useEffect(loadData, [month]);    
    } else if (isPartTime) {
        weekPicker = (
            <WeekPicker
            className="ml-lg-3"
            weeks={weeks}
            week={week}
            setWeek={event => setWeek(moment(event.target.value))}/>
        );

        // Fetch weekly summary
        useEffect(loadData, [week]);

        // Update week options according to the selected month
        useEffect(() => {        
            let currentDate = moment(month).startOf('month').startOf('week').add(1, 'days');
            let currentMonth = moment(month).startOf('month');
            const nextMonth = moment(month).add(1, 'month').startOf('months');
            const result = [];

            if (currentDate.isBefore(currentMonth)) {
                currentDate.add(7, 'days');
            }
                    
            while (currentDate.isSameOrBefore(nextMonth)) {
                // clone currentDate as currentDate is mutable
                result.push(moment(currentDate));
                currentDate.add(7, 'days');
            }
            
            setWeek(result[0]);
            setWeeks(result);
        }, [month]);
    }

    return (
        <div className="page">
            <h1>Salary Summary</h1>
            <div className="d-lg-inline-flex">
                <MonthPicker
                    month={month}
                    setMonth={setMonth}/>
                {weekPicker}
            </div>
            <SalarySummaryTable
                summary={summary}/>
        </div>  
    );
};

export default SalarySummaryPage;
