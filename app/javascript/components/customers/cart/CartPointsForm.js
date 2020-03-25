import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const CartPointsForm = (props) => {
    let infotext = "Use Points (You have " + props.points + ")"

    return (
        <Form inline onSubmit={props.handleSubmit}>
        <FormControl type="number" min="1" max={props.points}
            placeholder={infotext}
            className="mr-sm-2" style={{ width: 300 }}
            onChange={props.handleInsertChange} />
        <Button type="submit" variant="success">Apply</Button>
    </Form>
    )
}

export default CartPointsForm;
