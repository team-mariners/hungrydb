import React from 'react';

// Copied from admin/Schedule.js
const WorkSchedule = (props) => {
    // Transpose the schedule matrix
    const schedule = props.riderSchedule[0].map((col, i) => props.riderSchedule.map(row => row[i]));

    const intervalValues = intervals.map((val, i) => {
        return (
            <tr>
                <td>{val}</td>
                {schedule[i].map((val) => {
                    const value = (val == 0) ? '' : 'Active';
                    return (<td>{value}</td>);
                })}
            </tr>
        );
    })

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {tableHeaders}
                </tr>
            </thead>
            <tbody>
                {intervalValues}
            </tbody>
        </Table>
    );
};

export default WorkSchedule;