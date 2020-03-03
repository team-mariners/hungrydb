import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

/**
 * A general modal dialog which can be used by other components.
 * 
 * props properties
 * show = a boolean which toggles the modal's visibility.
 * onClose = a function that is triggered when the close button of modal is clicked.
 * closeButton = an optional boolean which toggles the close button's visibility (by default true).
 * size = an optional string which determines the size of the modal (available options: sm).
 */
const Modal = (props) => {
    let closeButton = (
        <FontAwesomeIcon icon={faTimes} onClick={props.onClose} size="lg" />
    );

    // The name of the css class(es) which is applied to the modal
    let className = "custom-modal".concat(" ", props.className);

    // Toggles modal's visibility
    if (!props.show) {
        return null;
    }

    // Toggles close button's visibility
    if (props.closeButton !== undefined && !props.closeButton) {
        closeButton = null;
    }

    // Changes the size of modal to small
    if (props.size !== undefined && props.size.localeCompare("sm") === 0) {
        className = className.concat(" ", "custom-modal-size-sm");
    }

    return (
        <div className="overlay">
            <section className={className}>
                {closeButton}
                {props.children}
            </section>
        </div>
    )
};

export default Modal;