import React from 'react';
import Table from 'react-bootstrap/Table'
import CartItem from './CartItem';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.orders);
        console.log(sessionStorage.getItem('orders'));
        this.orders = this.props.orders === null
            ? JSON.parse(sessionStorage.getItem('orders'))
            : this.props.orders;

        this.handlePromoChange = this.handlePromoChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { entered_promo: "", promotions: null };

        this.amountDue = 0;
        this.discountPercentage = sessionStorage.getItem("discount_percent");
        this.usedPromos = sessionStorage.getItem("used_promos");
    }

    componentDidMount() {
        axios.get('/api/v1/promotions/' + sessionStorage.getItem('restaurant_id')
            + '/promotions.json')
            .then(
                (response) => {
                    let retrieved_promotions = response.data;
                    this.setState({ promotions: retrieved_promotions });
                    console.log(this.state.promotions);
                })
            .catch(error => {
                console.log(error);
            })
        // Set amountDue to 0 for every render
        this.amountDue = 0;
    }

    handlePromoChange(e) {
        // Set amountDue to 0 for re-render after setState
        this.amountDue = 0;
        console.log(e.target.value);
        this.setState({ entered_promo: e.target.value });
    }

    handleSubmit(e) {
        // Check if promo used before
        if (this.usedPromos) {
            let usedPromosArray = this.usedPromos.split(" ");
            for (let usedCode of usedPromosArray) {
                if (usedCode == this.state.entered_promo) {
                    alert("You have already used " + usedCode);
                    return;
                }
            }
        }

        // Apply promo, save total discount % & used promo to sessionStorage
        let promotionsList = this.state.promotions;
        console.log(promotionsList);
        for (let promo of promotionsList) {
            if (promo.promocode === this.state.entered_promo) {
                let currPercentage = this.discountPercentage == null
                    ? 0
                    : parseFloat(this.discountPercentage);
                let newPercentage = currPercentage + parseFloat(promo.percentage) / 100;
                sessionStorage.setItem("discount_percent", newPercentage.toFixed(2));
                let currUsedPromos = this.usedPromos == null
                    ? ""
                    : this.usedPromos;
                sessionStorage.setItem("used_promos", currUsedPromos + " " + promo.promocode);
                alert(promo.promocode + " applied for " + promo.percentage + "% off!" + currPercentage);
                return;
            }
        }
    }

    render() {
        if (this.orders === null) {
            return <h3>Your cart is empty.</h3>
        } else {
            let cart = [];
            for (let item in this.orders) {
                if (this.orders.hasOwnProperty(item)) {
                    let foodDetails = this.orders[item];
                    cart.push(
                        <CartItem foodName={item} foodDetails={foodDetails} />
                    )
                    this.amountDue += foodDetails.price * foodDetails.quantity;
                }
            }
            return (
                <div className='cart-container'>
                    <div><br /></div>
                    <h3>Ordering From: {sessionStorage.getItem('restaurant_name')}</h3>
                    <div><br /></div>
                    <Table responsive className='cart-table'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Food</th>
                                <th>Single Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart}
                        </tbody>
                    </Table>
                    <div><br /></div>

                    <Form inline onSubmit={this.handleSubmit}>
                        <FormControl type="text"
                            placeholder="Promo Code"
                            className="mr-sm-2" style={{ width: 300 }}
                            onChange={this.handlePromoChange} />
                        <Button type="submit" variant="success">Apply</Button>
                    </Form>
                    <div><br /></div>

                    <h3 className='cart-amount-due'>
                        Amount Due: ${(this.amountDue - this.amountDue * this.discountPercentage).toFixed(2)}
                    </h3>
                    <div><br /></div>
                </div>
            )
        }
    }
}

export default Cart;
