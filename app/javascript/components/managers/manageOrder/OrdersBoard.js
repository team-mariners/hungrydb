import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomList from '../../utilities/CustomList';
import ListGroup from 'react-bootstrap/ListGroup';
import Order from './Order';
import moment from 'moment-timezone';

const OrdersBoard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/orders/index_restaurant')
        .then(result => {
            console.log(result);

            result.data.forEach(order => momentiseDateTime(order));

            setOrders(result.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const momentiseDateTime = (order) => {
        order.date_time = moment.parseZone(order.date_time)
    };

    const nav = [{key: "ongoing", value:"Ongoing"}, {key: "complete", value:"Complete"}];
    const listItems = orders.map(order => {
        return (
            <ListGroup.Item key={order.oid}>
                <Order order={order}/>
            </ListGroup.Item>
        )
    });

    return (
        <CustomList
            nav={nav}
            items={listItems}/>
    )
};

export default OrdersBoard;