import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import OrdersTab from './OrdersTab';
import OrdersList from './OrdersList';

const OrdersBoard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/orders/index_restaurant')
        .then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        })
    }, [])

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