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

    return (
        <Modal {...props}>
            <h1>Order Details</h1>
            <p><b>Order id: </b>{props.order.oid}</p>
            <p><b>Customer: </b>{props.order.customer_name}</p>
            <p><b>Order date & time: </b>{props.order.date_time.format(dateTimeFormat)}</p>

            <Table striped bordered>
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
        </Modal>
    )
};

export default OrderModal;