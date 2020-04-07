import React from 'react';
import Form from 'react-bootstrap/Form';

const WeekPicker = (props) => {    
    const options = props.weeks.map((week, index) => {
        const dateFormat = `[Week ${index + 1}:] MMM Do`;

        return (
            <option key={index + 1} value={week.format()}>{week.format(dateFormat)}</option>
        )
    });    

    return (
        <Form inline>
            <Form.Group>
                <Form.Label className={"mr-3 " + props.className}>Week:</Form.Label>
                <Form.Control as='select' value={props.week.format()} onChange={props.setWeek}>
                    {options}
                </Form.Control>
            </Form.Group>    
        </Form>
    )
};

export default WeekPicker;