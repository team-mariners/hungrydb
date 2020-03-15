import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

/**
 * A general modal dialog which can be used by other components.
 * 
 * props properties
 * show = a boolean which toggles the modal's visibility.
 * onClose = a function that is triggered when the close button of modal is clicked.
 * closeButton = an optional boolean which toggles the close button's visibility (by default true).
 * size = an optional string which determines the size of the modal (available options: sm).
 */
const FoodModal = (props) => {
    console.log(props);

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
            <section className='food-modal-content' >
                {closeButton}
                <div><br/></div>
                <img src={props.picture} height={200} width={200} />
                <div><br/></div>
                <h1>{ props.food.f_name }</h1>
                <h2>${ props.food.price }</h2>
                <Form inline>
                    <FormControl type="text" placeholder="Promo Code" className="mr-sm-2" />
                    <Button variant="success">Apply</Button>
                </Form>
                <div><br/></div>
                <Form inline>
                    <FormControl type="text" placeholder="Quantity of food" className="mr-sm-2" style={{width: 180}} />
                    <Button variant="primary">Add To Cart</Button>
                </Form>
            </section>
        </div>
    )
};

export default FoodModal;
