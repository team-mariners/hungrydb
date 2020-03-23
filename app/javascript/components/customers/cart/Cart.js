import React from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import CartItemTable from './CartItemTable';
import CartPromoForm from './CartPromoForm';
import Button from 'react-bootstrap/Button';

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
        this.checkPromoUsed = this.checkPromoUsed.bind(this);
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
        console.log(e.target.value.toUpperCase());
        this.setState({ entered_promo: e.target.value.toUpperCase() });
    }

    handleSubmit(e) {
        let usedPromo = this.checkPromoUsed();
        if (usedPromo) {
            alert("You have already used " + usedPromo);
            e.preventDefault();
            return;
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
                alert(promo.promocode + " applied for " + promo.percentage + "% off!");
                return;
            }
        }
    }

    checkPromoUsed() {
        // Check if promo used before
        if (this.usedPromos) {
            let usedPromosArray = this.usedPromos.split(" ");
            for (let usedCode of usedPromosArray) {
                if (usedCode == this.state.entered_promo) {
                    return usedCode;
                }
            }
        }
        return null;
    }

    render() {
        if (this.orders === null) {
            return <h3>Your cart is empty.</h3>
        } else {
            let items = [];
            for (let item in this.orders) {
                if (this.orders.hasOwnProperty(item)) {
                    let foodDetails = this.orders[item];
                    items.push(
                        <CartItem foodName={item} foodDetails={foodDetails} />
                    )
                    this.amountDue += foodDetails.price * foodDetails.quantity;
                }
            }
            return (
                <div className='cart-container'>
                    <div><br /></div>
                    <h3>Ordering From: {sessionStorage.getItem('restaurant_name')}</h3>
                    <h4>
                        (minimum order ${parseFloat(sessionStorage.getItem('restaurant_min')).toFixed(2)})
                    </h4>
                    <div><br /></div>
                    <CartItemTable items={items}/>
                    <div><br /></div>
                    
                    <h4>
                        Total: ${this.amountDue.toFixed(2)}
                    </h4>
                    <div><br /></div>
                    
                    <CartPromoForm
                        handleSubmit={this.handleSubmit}
                        handlePromoChange={this.handlePromoChange} />
                    <div><br /></div>

                    <h4>
                        Discount: -${(this.amountDue * this.discountPercentage).toFixed(2)} ( 
                        {this.discountPercentage * 100}%)
                    </h4>
                    <div><br /><br /></div>

                    <h2 className='cart-amount-due'>
                        Amount Due: ${(this.amountDue - this.amountDue * this.discountPercentage).toFixed(2)}
                    </h2>
                    <Button variant="primary" size="lg">PAY</Button>
                    <div><br /><br /></div>
                </div>
            )
        }
    }
}

export default Cart;
