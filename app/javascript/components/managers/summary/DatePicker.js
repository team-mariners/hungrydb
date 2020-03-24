import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import FormLabel from 'react-bootstrap/FormLabel';

const DatePicker = (props) => {
    return (        
        <Form inline {...props}>
            <FormLabel className="mr-3">Month:</FormLabel>
            <FormControl className="mr-3" type="text"/>
            <Button>Compute</Button>
        </Form>
    )
};

export default DatePicker;