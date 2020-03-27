import React from 'react';
import Modal from '../../utilities/Modal';
import { dateTimeFormat } from '../../utilities/Constants';
import Table from 'react-bootstrap/Table';

const OrderModal = (props) => {
    if (!props.order) {
        return null;
    }

    const tableRows = props.order.foods.map(food => {
        return (
            <tr key={food.food_id}>
                <td>{food.f_name}</td>
                <td>{food.quantity}</td>
            </tr>
        )
    });

    let review = null;
    const isOrderCompleted = "complete".localeCompare(props.order.status) === 0;
    if (isOrderCompleted) {
        review = <p><b>Review: </b>{!!props.order.food_review ? props.order.food_review : "No review was given."}</p>
    }

    const delivery_fee = parseFloat(props.order.delivery_fee);
    const totalExcludeDeliveryFee = parseFloat(props.order.total_price) - delivery_fee;

    return (
        <Modal {...props}>
            <h1>Order Details</h1>
            <p><b>Order id: </b>{props.order.oid}</p>
            <p><b>Customer: </b>{props.order.customer_name}</p>
            <p><b>Order date & time: </b>{props.order.date_time.format(dateTimeFormat)}</p>
            <p><b>Payment method: </b>{props.order.payment_method}</p>
            {review}

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

            <h5><b>Total Cost (Excluding Delivery):</b> $ {totalExcludeDeliveryFee.toFixed(2)}</h5>
            <h5><b>Delivery:</b> $ {delivery_fee.toFixed(2)}</h5>
        </Modal>
    )
};

export default OrderModal;