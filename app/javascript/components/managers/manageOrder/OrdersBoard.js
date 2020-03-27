import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import ListGroup from 'react-bootstrap/ListGroup';
import CustomList from '../../utilities/CustomList';
import Order from './Order';
import OrderModal from './OrderModal';

const OrdersBoard = () => {
    const ORDERS_TYPES = {
        ongoing: "ongoing",
        complete: "complete"
    };

    const [orders, setOrders] = useState([]);
    const [visibileOrders, setVisibleOrders] = useState([]);
    const [ordersType, setOrdersType] = useState(ORDERS_TYPES.ongoing);

    const [isViewOrder, setIsViewOrder] = useState(false);
    const [order, setOrder] = useState(null); // For displaying of the order details
    
    useEffect(() => {
        axios.get('/api/v1/orders/index_restaurant')
            .then(result => {
                console.log(result);
                result.data.forEach(order => momentiseDateTime(order));
                setOrdersAndVisibleOrders(result.data);
            }).catch(error => {
                console.log(error);
            })
    }, [])

    // For the change in selected order type
    useEffect(() => {
        filterAndSetVisibleOrders(orders);
    }, [ordersType])

    const momentiseDateTime = (order) => {
        order.date_time = moment.parseZone(order.date_time)
    };

    const setOrdersAndVisibleOrders = (orders) => {
        setOrders(orders);
        filterAndSetVisibleOrders(orders);
    };

    const filterAndSetVisibleOrders = (orders) => {
        let result = [];

        if (ordersType == ORDERS_TYPES.ongoing) {
            result = orders.filter(order => {
                return "in progress".localeCompare(order.status) === 0;
            });
        } else if (ordersType == ORDERS_TYPES.complete) {
            result = orders.filter(order => {
                return "complete".localeCompare(order.status) === 0;
            });
        }

        console.log(result);
        setVisibleOrders(result);
    };

    const showOrder = (order) => {
        setOrder(order);
        setIsViewOrder(true);
    };

    const nav = [{ key: ORDERS_TYPES.ongoing, value: "Ongoing" }, { key: ORDERS_TYPES.complete, value: "Complete" }];
    const listItems = visibileOrders.map(order => {
        return (
            <ListGroup.Item key={order.oid}>
                <Order
                    order={order}
                    showOrder={() => showOrder(order)} />
            </ListGroup.Item>
        )
    });

    return (
        <React.Fragment>
            <CustomList
                nav={nav}
                defaultActiveKey={ORDERS_TYPES.ongoing}
                onSelect={(selectedType) => setOrdersType(selectedType)}
                items={listItems} />
            <OrderModal
                order={order}
                show={isViewOrder}
                onClose={() => setIsViewOrder(false)} />
        </React.Fragment>
    )
};

export default OrdersBoard;