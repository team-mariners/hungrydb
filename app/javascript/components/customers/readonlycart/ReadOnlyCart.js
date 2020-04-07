import React from 'react';
import axios from 'axios';
import ReadOnlyCartItem from '../readonlycart/ReadOnlyCartItem';
import ReadOnlyCartItemTable from '../readonlycart/ReadOnlyCartItemTable';
import ReadOnlyCartPromoDisplay from '../readonlycart/ReadOnlyCartPromoDisplay';
import ReadOnlyCartPointsDisplay from '../readonlycart/ReadOnlyCartPointsDisplay';
import Button from 'react-bootstrap/Button';
import secureStorage from '../../utilities/HungrySecureStorage';
import CustomerNavBar from '../CustomerNavBar';

class ReadOnlyCart extends React.Component {
    constructor(props) {
        super(props);
        this.foods = JSON.parse(secureStorage.getItem('foods'));
        console.log(this.foods);

        this.totalCost = 0;
        this.amountDue = 0;
        this.discountPercentage = secureStorage.getItem("discount_percent");
        this.usedPromoCode = JSON.parse(secureStorage.getItem("used_promo_code"));
        this.usedPromoId = JSON.parse(secureStorage.getItem("used_promo_id"));
        this.points = secureStorage.getItem("points") ? secureStorage.getItem("points") : 0;
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
                    <ReadOnlyCartItem foodName={item} foodDetails={foodDetails} />
                )
                this.totalCost += foodDetails.price * foodDetails.quantity;
            }
        }
        this.amountDue = (this.totalCost - this.totalCost * this.discountPercentage
            - this.points + 3).toFixed(2);
        return (
            <div className='cart-container'>
                <CustomerNavBar />
                <div><br /></div>
                <h3>Ordering From: {secureStorage.getItem('restaurant_name')}</h3>
                <h4>
                    (minimum order ${parseFloat(
                    secureStorage.getItem('restaurant_min')).toFixed(2)}
                        )
                    </h4>
                <div><br /></div>
                <ReadOnlyCartItemTable items={items} />
                <div><br /></div>

                <h4>
                    Total: ${this.totalCost.toFixed(2)}
                </h4>
                <h4>
                    Delivery Fee: $3.00
                    </h4>
                <div><br /><br /></div>

                <ReadOnlyCartPromoDisplay />
                <div><br /></div>

                <h4>
                    Discount: -${(this.totalCost * this.discountPercentage).toFixed(2)} (
                        {this.discountPercentage * 100}%)
                    </h4>
                <div><br /><br /></div>

                <ReadOnlyCartPointsDisplay
                    points={this.props.points} amountDue={this.amountDue} />
                <div><br /></div>

                <h4>
                    Offset: -${parseInt(this.points).toFixed(2)}
                </h4>
                <div><br /><br /></div>

                <h2 className='cart-amount-due'>
                    Amount Due: ${this.amountDue}
                </h2>
                <div><br /><br /></div>
            </div>
        )
    }
}

export default ReadOnlyCart;
