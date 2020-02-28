import React from 'react';
import Modal from '../../utilities/Modal';
import Form from 'react-bootstrap/Form';

const NewDish = (props) => {
    return (
        <Modal show={props.show} onClose={props.onClose}>
            <h1>New Dish</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Dish Name</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price ($)</Form.Label>
                    <Form.Control type="number"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Daily Maximum Limit (quantity)</Form.Label>
                    <Form.Control type="number"/>
                </Form.Group>
            </Form>
        </Modal>
    )
};

export default NewDish;