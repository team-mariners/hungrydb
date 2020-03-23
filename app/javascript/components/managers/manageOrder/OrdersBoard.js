import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import ListGroup from 'react-bootstrap/ListGroup';
import CustomList from '../../utilities/CustomList';
import Order from './Order';
import OrderModal from './OrderModal';

const OrdersBoard = () => {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState(null); // For displaying of the order details

    const [isViewOrder, setIsViewOrder] = useState(false);
    
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

    const showOrder = (order) => {
        setOrder(order);
        setIsViewOrder(true);
    }

    const nav = [{key: "ongoing", value:"Ongoing"}, {key: "complete", value:"Complete"}];
    const listItems = orders.map(order => {
        return (
            <ListGroup.Item key={order.oid}>
                <Order
                    order={order}
                    showOrder={() => showOrder(order)}/>
            </ListGroup.Item>
        )
    });

    return (
        <React.Fragment>
            <CustomList
                nav={nav}
                items={listItems}/>
            <OrderModal
                order={order}
                show={isViewOrder}
                onClose={() => setIsViewOrder(false)}/>
        </React.Fragment>
    )
};

export default OrdersBoard;