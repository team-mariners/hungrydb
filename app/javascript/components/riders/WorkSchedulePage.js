import React from 'react';
import WorkSchedule from './schedule/WorkSchedule';

const WorkSchedulePage = (props) => {
    return (
        <div className="page">
            <h1>My Work Schedule</h1>
            <WorkSchedule {...props}/>
        </div>
    )
};

export default WorkSchedulePage;