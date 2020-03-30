import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const CartPointsForm = (props) => {

    // If points <= amountDue, can use all points
    // If points > amountDue, can use up to amountDue points
    let maxPoints = (props.points <= parseInt(props.amountDue))
                    ? props.points
                    : parseInt(props.amountDue);

    let infotext = "Use Points (You can use " + maxPoints + ")";

    return (
        <Form inline onSubmit={props.handleSubmit}>
        <FormControl type="number" min="0" max={maxPoints}
            placeholder={infotext}
            className="mr-sm-2" style={{ width: 300 }}
            onChange={props.handleInsertChange} />
        <Button type="submit" variant="success">Apply</Button>
    </Form>
    )
}

export default CartPointsForm;
