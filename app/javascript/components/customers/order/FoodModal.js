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
class FoodModal extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.food = this.props.food;
        this.food["quantity"] = 0;
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { order: this.food };

        this.closeButton = (
            <FontAwesomeIcon icon={faTimes} onClick={this.props.onClose} size="lg" />
        );

        // The name of the css class(es) which is applied to the modal
        this.className = "custom-modal".concat(" ", this.props.className);

        // Toggles close button's visibility
        if (this.props.closeButton !== undefined && !this.props.closeButton) {
            this.closeButton = null;
        }

        // Changes the size of modal to small
        if (this.props.size !== undefined && this.props.size.localeCompare("sm") === 0) {
            this.className = this.className.concat(" ", "custom-modal-size-sm");
        }
    }

    handleQuantityChange(e) {
        this.food["quantity"] = e.target.value;
        console.log(this.food);
        this.setState({ order: this.food });
    }

    handleSubmit(e) {
        console.log(this.food);
        if (!this.food.quantity || parseInt(this.food.quantity) <= 0) {
            alert("Please insert a valid number more than 0");
            e.preventDefault;
        } else {
            this.props.onSubmitOrder(this.food);
            this.props.onClose();
            alert("Ordered " + this.food.quantity + " " + this.food.f_name);
            this.food.quantity = 0;
        }
    }

    render() {
        // Toggles modal's visibility
        if (!this.props.show) {
            return null;
        } else {
            return (
                <div className="overlay">
                    <section className='food-modal-content' >
                        {this.closeButton}
                        <div><br /></div>
                        <img src={this.props.picture} height={200} width={200} />
                        <div><br /></div>
                        <h1>{this.props.food.f_name}</h1>
                        <h2>${this.props.food.price}</h2>
                        <div><br /></div>

                        <h6>({this.props.food.daily_limit - this.props.food.num_orders} left)</h6>
                        <Form inline onSubmit={this.handleSubmit}>
                            <FormControl type="number" min="1" defaultValue="1"
                                placeholder="Order Quantity"
                                className="mr-sm-2" style={{ width: 180 }}
                                onChange={this.handleQuantityChange} />
                            <Button variant="primary">Add To Cart</Button>
                            {/* Use Button onClick to handle if need to prevent redirection */}
                        </Form>

                        {/* Input range handle change on an info box originally set to 0
                        <p>Order Amount:</p>
                        <input
                        type="range"
                        defaultValue={0}
                        min={0}
                        max={5}
                        step={1} /> */}
                        <div><br /><br /></div>
                    </section>
                </div>
            )
        }
    }
};

export default FoodModal;
