import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const PaymentMethod = (props) => {

    return (
        <Form>
            <Form.Group>
                <Form.Label>Select Payment Method</Form.Label>
                <Form.Control as="select" style={{width: "20%"}}>
                    <option>Cash</option>
                    <option>Credit Card</option>
                </Form.Control>
            </Form.Group>
        </Form>
    )
}

export default PaymentMethod;
