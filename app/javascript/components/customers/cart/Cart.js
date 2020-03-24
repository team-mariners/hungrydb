import React from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import CartItemTable from './CartItemTable';
import CartPromoForm from './CartPromoForm';
import CartPointsForm from './CartPointsForm';
import Button from 'react-bootstrap/Button';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.orders = JSON.parse(sessionStorage.getItem('orders'))
        console.log(this.orders);

        this.handlePromoInsertChange = this.handlePromoInsertChange.bind(this);
        this.handleSubmitPromo = this.handleSubmitPromo.bind(this);
        this.checkPromoUsed = this.checkPromoUsed.bind(this);
        this.handlePointsInsertChange = this.handlePointsInsertChange.bind(this);
        this.handleSubmitPoints = this.handleSubmitPoints.bind(this);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.state = { promotions: null, entered_promo: "", entered_points: "" };

        this.totalCost = 0;
        this.amountDue = 0;
        this.discountPercentage = sessionStorage.getItem("discount_percent");
        this.usedPromos = JSON.parse(sessionStorage.getItem("used_promos"));
        this.points = 0;
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
    }

    handlePromoInsertChange(e) {
        console.log(e.target.value.toUpperCase());
        this.setState({ entered_promo: e.target.value.toUpperCase() });
    }

    handleSubmitPromo(e) {
        let usedPromo = this.checkPromoUsed();
        if (usedPromo) {
            alert("You have already used " + usedPromo);
            e.preventDefault();
            return;
        }

        // Apply promo, save total discount % & used promo to sessionStorage
        let promotionsList = this.state.promotions;
        for (let promo of promotionsList) {
            if (promo.promocode === this.state.entered_promo) {
                let currPercentage = this.discountPercentage == null
                    ? 0
                    : parseFloat(this.discountPercentage);
                let newPercentage = currPercentage + parseFloat(promo.percentage) / 100;
                sessionStorage.setItem("discount_percent", newPercentage.toFixed(2));

                let currUsedPromos = this.usedPromos == null
                    ? []
                    : this.usedPromos;
                currUsedPromos.push(promo.promocode);
                console.log(currUsedPromos);
                sessionStorage.setItem("used_promos", JSON.stringify(currUsedPromos));
                // sessionStorage.setItem("used_promo_ids", promo);
                alert(promo.promocode + " applied for " + promo.percentage + "% off!");
                return;
            }
        }
        alert("No such promotion exists!");
        e.preventDefault();
    }

    checkPromoUsed() {
        // Check if promo used before
        if (this.usedPromos) {
            let usedPromosArray = this.usedPromos;
            for (let usedCode of usedPromosArray) {
                if (usedCode == this.state.entered_promo) {
                    return usedCode;
                }
            }
        }
        return null;
    }

    handlePointsInsertChange(e) {
        console.log(e.target.value);
        this.setState({ entered_points: e.target.value });
    }

    handleSubmitPoints() {
        this.points = parseInt(this.state.entered_points);
        console.log(this.points);
    }

    handleSubmitOrder(e) {
        if (this.totalCost < sessionStorage.getItem('restaurant_min')) {
            alert("Your order cost is lower than the minimum required by the restaurant.");
            e.preventDefault();
        }
        this.props.onAmountDueSubmit(this.amountDue);
    }

    render() {
        // Prevent erratic increment of totalCost on re-render
        this.totalCost = 0;

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
                    this.totalCost += foodDetails.price * foodDetails.quantity;
                }
            }
            this.amountDue = (this.totalCost - this.totalCost * this.discountPercentage+ 3)
                            .toFixed(2);
            return (
                <div className='cart-container'>
                    <div><br /></div>
                    <h3>Ordering From: {sessionStorage.getItem('restaurant_name')}</h3>
                    <h4>
                        (minimum order ${parseFloat(
                            sessionStorage.getItem('restaurant_min')).toFixed(2)}
                        )
                    </h4>
                    <div><br /></div>
                    <CartItemTable items={items}/>
                    <div><br /></div>
                    
                    <h4>
                        Total: ${this.totalCost.toFixed(2)}
                    </h4>
                    <h4>
                        Delivery Fee: $3.00
                    </h4>
                    <div><br /><br /></div>
                    
                    <CartPromoForm
                        handleSubmit={this.handleSubmitPromo}
                        handleInsertChange={this.handlePromoInsertChange} />
                    <div><br /></div>

                    <h4>
                        Discount: -${(this.totalCost * this.discountPercentage).toFixed(2)} ( 
                        {this.discountPercentage * 100}%)
                    </h4>
                    <div><br /><br /></div>

                    <CartPointsForm
                        points={this.props.points} handleSubmit={this.handleSubmitPoints}
                        handleInsertChange={this.handlePointsInsertChange} />
                    <div><br /></div>

                    <h4>
                        Offset: -${this.points.toFixed(2)}
                    </h4>
                    <div><br /><br /></div>

                    <h2 className='cart-amount-due'>
                        Amount Due: ${this.amountDue}
                    </h2>
                    <Button href="/customer/complete-order" variant="primary" size="lg"
                        onClick={this.handleSubmitOrder}>
                            ORDER
                    </Button>
                    <div><br /><br /></div>
                </div>
            )
        }
    }
}

export default Cart;
