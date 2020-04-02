import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment-timezone';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import CustomList from '../../utilities/CustomList';
import Delivery from './Delivery';

const DeliveriesBoard = () => {
    const DELIVERIES_TYPES = {
        ongoing: "ongoing",
        complete: "complete"
    };

    const [deliveries, setDeliveries] = useState([]);
    const [visibleDeliveries, setVisibleDeliveries] = useState([]);
    const [deliveriesType, setDeliveriesType] = useState(DELIVERIES_TYPES.ongoing); 
    

    useEffect(() => {
        Axios.get("/rider/all_deliveries")
            .then(result => {
                console.log(result);
                
                result.data.forEach(delivery => {
                    delivery.order_time = moment(delivery.order_time);
                    delivery.depart_to_restaurant_time = !!delivery.depart_to_restaurant_time
                        ? moment(delivery.depart_to_restaurant_time) : null;
                    delivery.arrive_at_restaurant_time = !!delivery.arrive_at_restaurant_time
                        ? moment(delivery.arrive_at_restaurant_time) : null;
                    delivery.depart_to_customer_time = !!delivery.depart_to_customer_time
                        ? moment(delivery.depart_to_customer_time) : null;
                    delivery.order_delivered_time = !!delivery.order_delivered_time
                        ? moment(delivery.order_delivered_time) : null;
                });

                setDeliveries(result.data);
                setVisibleDeliveries(result.data);
            }).catch(error => console.log(error));
    }, []);

    const nav = [{ key: DELIVERIES_TYPES.ongoing, value: "Ongoing" },
        { key: DELIVERIES_TYPES.complete, value: "Complete" }];

    const listItems = visibleDeliveries.map(delivery => {
        return (
            <ListGroupItem key={delivery.oid}>
                <Delivery delivery={delivery}/>
            </ListGroupItem>
        )
    });

    return (
        <CustomList
            nav={nav}
            defaultActiveKey={DELIVERIES_TYPES.ongoing}
            onSelect={(selectedType) => setDeliveriesType(selectedType)}
            items={listItems}/>
    )
};

export default DeliveriesBoard;