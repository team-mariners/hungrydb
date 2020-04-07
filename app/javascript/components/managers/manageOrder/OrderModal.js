import React from 'react';
import Modal from '../../utilities/Modal';
import { dateTimeFormat } from '../../utilities/Constants';
import Table from 'react-bootstrap/Table';

/**
 * 
 * @param {*} props 
 * order: the order object containing info to be displayed.
 * isRider: if true, information for restaurant manager's use will not be displayed in the order modal.
 * show, onClose: for the use of the modal component
 */
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

    let promocode = "-";
    if (!!props.order.promocode) {
        if ("fds".localeCompare(props.order.p_type) === 0) {
            promocode = `${props.order.promocode} (HungryDB promotion)`;
        } else {
            promocode = props.order.promocode;
        }
    }

    const riderName = props.isRider ? null : (
        <p><b>Rider: </b>{props.order.rider_name}</p>
    );

    const discountInformation = props.isRider ? null : (
        <React.Fragment>            
            <p><b>Points Offset: </b>{props.order.point_offset} points</p>
            <p><b>Promocode: </b>{promocode}</p>
            <p><b>Promo Percentage: </b>{!props.order.promo_percentage ? "-" : `${props.order.promo_percentage}%`}</p>
            {review}
        </React.Fragment>
    );

    console.log(props.order);
    
    return (
        <Modal {...props}>
            <h1>Order Details</h1>
            <p><b>Order id: </b>{props.order.oid}</p>
            <p><b>Customer: </b>{props.order.customer_name}</p>
            <p><b>Order date & time: </b>{props.order.date_time.format(dateTimeFormat)}</p>
            <p><b>Payment method: </b>{props.order.payment_method}</p>
            {discountInformation}
            {riderName}

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

            <h5><b>Net Total (Excluding Delivery):</b> $ {parseFloat(props.order.total_cost).toFixed(2)}</h5>
            <h5><b>Delivery:</b> $ {parseFloat(props.order.delivery_fee).toFixed(2)}</h5>
        </Modal>
    )
};

export default OrderModal;