import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';

const AddressBox = (props) => {

    return (
        <Form inline onSubmit={props.handleSubmit}>
        <FormControl type="text"
            placeholder="Address"
            className="mr-sm-2" style={{ width: 1000 }}
            onChange={props.handleInsertChange} />
    </Form>
    )
}

export default AddressBox;
