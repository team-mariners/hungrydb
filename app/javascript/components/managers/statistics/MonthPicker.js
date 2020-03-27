import React from 'react';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import DateTime from 'react-datetime';

const DatePicker = (props) => {
    return (
        <Form inline className={props.className} style={props.style}>
            <FormLabel className="mr-3">Month:</FormLabel>
            <DateTime
                dateFormat='MMMM, YYYY'
                timeFormat={false}
                value={props.month}
                onChange={month => props.setMonth(month)}/>
        </Form>
    )
};

export default DatePicker;