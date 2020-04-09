import React from 'react';
import moment from 'moment-timezone';

export const isNotOperatingHours = () => {
    const todayDate = moment().format('YYYY-MM-DD');
    const startingTime = moment(todayDate).hour(10);
    const closingTime = moment(todayDate).hour(22);
    const now = moment();

    return now.isSameOrBefore(startingTime) || now.isSameOrAfter(closingTime);
};