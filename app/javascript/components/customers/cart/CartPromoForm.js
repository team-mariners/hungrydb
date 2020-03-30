import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const CartPromoForm = (props) => {

    return (
        <Form inline onSubmit={props.handleSubmit}>
        <FormControl type="text"
            placeholder="Promo Code"
            className="mr-sm-2" style={{ width: 300 }}
            onChange={props.handleInsertChange} />
        <Button type="submit" variant="success">Apply</Button>
    </Form>
    )
}

export default CartPromoForm;
