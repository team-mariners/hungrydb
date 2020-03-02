import React from 'react';
import Modal from "./Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

/**
 * A confirmation modal dialog.
 * 
 * props properties
 * show = A boolean which toggles the dialog's visibility.
 * onClose = A function that is triggered when the No button of the dialog is clicked.
 * onConfirm = function that is triggered when the Yes button of the dialog is clicked.
 */
const ConfirmationDialog = (props) => {
    return (
        <Modal show={props.show} closeButton={false} size="sm">
            <Container className="text-center dialog">
                <h4>Are you sure?</h4>

                <div>
                    <Button type="button" variant="light" onClick={props.onClose}>No</Button>
                    <Button type="button" variant="primary" onClick={props.onConfirm}>Yes</Button>
                </div>
            </Container>
        </Modal>
    )
};

export default ConfirmationDialog;
