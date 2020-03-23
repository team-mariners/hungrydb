import React from 'react';

const CartItem = (props) => {
    console.log(props);

    return (
        <>
            <tr>
                <td>
                <img
                    width={80}
                    height={80}
                    src={props.foodDetails.picture}
                    alt="Generic placeholder"
                />
                </td>
                    <td>{props.foodName}</td>
                    <td>${parseFloat(props.foodDetails.price).toFixed(2)}</td>
                    <td>{parseFloat(props.foodDetails.quantity)}</td>
                    <td>
                        ${parseFloat(props.foodDetails.quantity * props.foodDetails.price)
                        .toFixed(2)}
                    </td>
            </tr>
        </>
    )
}

export default CartItem;
