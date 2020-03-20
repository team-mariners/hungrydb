import React from 'react';
import Card from 'react-bootstrap/Card';
import OrdersTab from './OrdersTab';
import OrdersList from './OrdersList';

const OrdersBoard = () => {
    return (
        <Card>
            <Card.Header>
                <OrdersTab/>
            </Card.Header>

            <OrdersList/>
        </Card>
    )
};

export default OrdersBoard;