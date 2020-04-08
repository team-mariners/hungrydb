import React from 'react';
import Modal from '../../utilities/Modal';
import moment from 'moment-timezone';
import { dateTimeFormat } from '../../utilities/Constants';
import Table from 'react-bootstrap/Table';

/**
 * A general modal dialog which can be used by other components.
 * 
 * props properties
 * show = a boolean which toggles the modal's visibility.
 * onClose = a function that is triggered when the close button of modal is clicked.
 * closeButton = an optional boolean which toggles the close button's visibility (by default true).
 * size = an optional string which determines the size of the modal (available options: sm).
 */
const OrderHistoryModal = (props) => {
    console.log(props);
    const order = props.order;
    const paymethod = order.payment_method;

    const discountInformation =
        <React.Fragment>
            <p><b>Points Offset: </b>- ${order.point_offset}</p>
            <p><b>Promocode: </b>{order.promocode ? order.promocode : "-"}</p>
            <p><b>Promo Percentage: </b>{!order.promo_discount ? "-" : `${order.promo_discount}%`}</p>
        </React.Fragment>

    const tableRows = order.foods.map(food => {
        return (
            <tr key={food.food_id}>
                <td>{food.f_name}</td>
                <td>{food.quantity}</td>
            </tr>
        )
    });

    return (
        <Modal {...props}>
            <h1>Order Details</h1>
            <p><b>Order id: </b>{order.oid}</p>
            <p><b>Restaurant: </b>{order.restaurant_name}</p>
            <p><b>Order date & time: </b>{moment.parseZone(order.date_time).format(dateTimeFormat)}</p>
            <p><b>Payment method: </b>{paymethod.charAt(0).toUpperCase() + paymethod.slice(1)}</p>
            {discountInformation}

            <Table striped bordered className="my-4">
                <thead>
                    <tr>
                        <th>Dish Name</th>
                        <th>Quantity</th>                    
                    </tr>
                </thead>

                <tbody>
                    {tableRows}
                </tbody>
            </Table>

            <h5><b>Food Total:</b> $ {parseFloat(order.total_price - order.delivery_fee).toFixed(2)}</h5>
            <h5><b>Delivery Fee:</b> $ {parseFloat(order.delivery_fee).toFixed(2)}</h5>
            <h5><b>Amount Paid:</b> $ {parseFloat(order.amount_paid).toFixed(2)}</h5>
        </Modal>
    )
}


export default OrderHistoryModal;
