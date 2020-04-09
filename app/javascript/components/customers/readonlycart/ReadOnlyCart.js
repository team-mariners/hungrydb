import React from 'react';
import axios from 'axios';
import ReadOnlyCartItem from '../readonlycart/ReadOnlyCartItem';
import ReadOnlyCartItemTable from '../readonlycart/ReadOnlyCartItemTable';
import ReadOnlyCartPromoDisplay from '../readonlycart/ReadOnlyCartPromoDisplay';
import ReadOnlyCartPointsDisplay from '../readonlycart/ReadOnlyCartPointsDisplay';
import secureStorage from '../../utilities/HungrySecureStorage';
import CustomerNavBar from '../CustomerNavBar';
import Button from 'react-bootstrap/Button';

class ReadOnlyCart extends React.Component {
    constructor(props) {
        super(props);
        this.foods = JSON.parse(secureStorage.getItem('foods'));
        console.log(this.foods);

        this.totalCost = 0;
        this.discountPercentage = secureStorage.getItem("discount_percent");
        this.usedPromoCode = JSON.parse(secureStorage.getItem("used_promo_code"));
        this.usedPromoId = JSON.parse(secureStorage.getItem("used_promo_id"));
        this.pointsOffset = secureStorage.getItem("points_offset")
            ? secureStorage.getItem("points_offset") : 0;
    }

    // Reload page to trigger listening for database notification of order completion
    componentWillMount() {
        this.refreshId = setInterval(() => {
            window.location.reload();
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.refreshId);
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
                    <ReadOnlyCartItem foodName={item} foodDetails={foodDetails}
                        onDeleteItem={this.handleDeleteItem} />
                )
                this.totalCost += foodDetails.price * foodDetails.quantity;
            }
        }
        return (
            <React.Fragment>
                <CustomerNavBar />
                <div className='cart-container'>
                    <div><br /></div>
                    <h3>Order In Progress From: {secureStorage.getItem('restaurant_name')}</h3>

                    <div><br /></div>
                    <ReadOnlyCartItemTable items={items} />
                    <div><br /></div>

                    <h4>
                        Total: ${this.totalCost.toFixed(2)}
                    </h4>
                    <div><br /><br /></div>

                    <ReadOnlyCartPromoDisplay totalCost={this.totalCost}
                        discountPercentage={this.discountPercentage} />

                    <ReadOnlyCartPointsDisplay />

                    <h4>
                        Delivery Fee: ${secureStorage.getItem('delivery_fee').toFixed(2)}
                    </h4>

                    <h2 className='cart-amount-due'>
                        Paid: ${secureStorage.getItem('amount_due')}
                    </h2>
                    <div><br /><br /></div>

                    <Button href="/customer/review_order" variant="danger" size="lg">
                        COMPLETE
                    </Button>
                    <div><br /><br /></div>
                </div>
            </React.Fragment>
        )
    }
}

export default ReadOnlyCart;
