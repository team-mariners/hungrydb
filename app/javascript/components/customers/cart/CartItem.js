import React from 'react';
import Button from 'react-bootstrap/Button';

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
                    <td><Button variant="danger" onClick={() => props.onDeleteItem(props.foodName)}>
                            Delete
                        </Button>
                    </td>
            </tr>
        </>
    )
}

export default CartItem;
