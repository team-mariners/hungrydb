import React from 'react';

const Cart = (props) => {
    console.log(props.orders);
    console.log(localStorage.getItem('orders'));
    let orders = props.orders === null
                    ? JSON.parse(localStorage.getItem('orders'))
                    : props.orders;

    if (orders === null) {
        return <h3>Your cart is empty.</h3>
    } else {
        return (
            <React.Fragment>
                {orders.f_name}
            </React.Fragment>
        )
    }
}

export default Cart;
