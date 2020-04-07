import React from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import CartItemTable from './CartItemTable';
import CartPromoForm from './CartPromoForm';
import CartPointsForm from './CartPointsForm';
import Button from 'react-bootstrap/Button';
import secureStorage from '../../utilities/HungrySecureStorage';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.foods = JSON.parse(secureStorage.getItem('foods'));
        console.log(this.foods);

        this.handleDeleteItem = this.handleDeleteItem.bind(this)
        this.handlePromoInsertChange = this.handlePromoInsertChange.bind(this);
        this.handleSubmitPromo = this.handleSubmitPromo.bind(this);
        this.handlePointsInsertChange = this.handlePointsInsertChange.bind(this);
        this.handleSubmitPoints = this.handleSubmitPoints.bind(this);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.state = { promotions: null, entered_promo: "", entered_points: "" };

        this.totalCost = 0;
        this.amountDue = 0;
        this.discountPercentage = secureStorage.getItem("discount_percent");
        this.usedPromoCode = JSON.parse(secureStorage.getItem("used_promo_code"));
        this.usedPromoId = JSON.parse(secureStorage.getItem("used_promo_id"));
        this.points = secureStorage.getItem("points") ? secureStorage.getItem("points") : 0;
    }

    componentDidMount() {
        axios.get('/api/v1/promotions/' + secureStorage.getItem('restaurant_id')
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

    handleDeleteItem(foodName) {
        if (!confirm("Are you sure you want to remove " + foodName + "?")) {
            e.preventDefault();
            return;
        }

        for (let storedName in this.foods) {
            if (storedName === foodName) {
                // delete this.foods.storedName;
                let temp = {};
                for (let order in this.foods) {
                    if (order !== foodName) {
                        temp[order] = this.foods[storedName];
                    }
                }
                this.foods = Object.keys(temp).length === 0 ? null : temp;
                console.log(this.foods);
                secureStorage.setItem("foods", JSON.stringify(this.foods));
                location.reload();
            }
        }
        console.log(foodName);
    }

    handlePromoInsertChange(e) {
        console.log(e.target.value.toUpperCase());
        this.setState({ entered_promo: e.target.value.toUpperCase() });
    }

    handleSubmitPromo(e) {
        if (this.usedPromoCode === this.state.entered_promo) {
            alert("You have already used " + this.usedPromoCode);
            e.preventDefault();
            return;
        }

        // Apply promo, save total discount % & used promo to sessionStorage
        let promotionsList = this.state.promotions;
        for (let promo of promotionsList) {
            if (promo.promocode === this.state.entered_promo) {
                let newPercentage = parseFloat(promo.percentage) / 100;
                secureStorage.setItem("discount_percent", newPercentage.toFixed(2));

                secureStorage.setItem("used_promo_code", JSON.stringify(promo.promocode));

                secureStorage.setItem("used_promo_id", JSON.stringify(promo.id));

                alert(promo.promocode + " applied for " + promo.percentage + "% off!");
                return;
            }
        }
        alert("No such promotion exists!");
        e.preventDefault();
    }

    handlePointsInsertChange(e) {
        console.log(e.target.value);
        this.setState({ entered_points: e.target.value });
    }

    handleSubmitPoints(e) {
        if (parseInt(this.state.entered_points) >= 0) {
            secureStorage.setItem("points", this.state.entered_points);
        } else {
            e.preventDefault();
        }
    }

    handleSubmitOrder(e) {
        if (this.totalCost < secureStorage.getItem('restaurant_min')) {
            alert("Your order cost is lower than the minimum required by the restaurant.");
            e.preventDefault();
        }
        this.props.onOrderSubmit(this.totalCost + 3, this.amountDue);
    }

    render() {
        // Prevent erratic increment of totalCost on re-render
        this.totalCost = 0;

        if (!this.foods) {
            return <h3>Your cart is empty.</h3>
        } else if (!secureStorage.getItem('restaurant_id') ||
            !secureStorage.getItem('restaurant_name') ||
            !secureStorage.getItem('restaurant_min')) {
            { secureStorage.clear() }
            return <h3>An error has occurred. Please place your order again.</h3>
        }

        let items = [];
        for (let item in this.foods) {
            if (this.foods.hasOwnProperty(item)) {
                let foodDetails = this.foods[item];
                items.push(
                    <CartItem foodName={item} foodDetails={foodDetails}
                        onDeleteItem={this.handleDeleteItem} />
                )
                this.totalCost += foodDetails.price * foodDetails.quantity;
            }
        }
        this.amountDue = (this.totalCost - this.totalCost * this.discountPercentage
            - this.points + 3).toFixed(2);
        return (
            <div className='cart-container'>
                <div><br /></div>
                <h3>Ordering From: {secureStorage.getItem('restaurant_name')}</h3>
                <h4>
                    (minimum order ${parseFloat(
                    secureStorage.getItem('restaurant_min')).toFixed(2)}
                        )
                    </h4>
                <div><br /></div>
                <CartItemTable items={items} />
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
                    points={this.props.points} amountDue={this.amountDue}
                    handleSubmit={this.handleSubmitPoints}
                    handleInsertChange={this.handlePointsInsertChange} />
                <div><br /></div>

                <h4>
                    Offset: -${parseInt(this.points).toFixed(2)}
                </h4>
                <div><br /><br /></div>

                <h2 className='cart-amount-due'>
                    Amount Due: ${this.amountDue}
                </h2>
                <div><br /></div>
                <Button href="/customer/complete_order" variant="primary" size="lg"
                    onClick={this.handleSubmitOrder}>
                    ORDER
                    </Button>
                <div><br /><br /></div>
            </div>
        )
    }
}

export default Cart;
