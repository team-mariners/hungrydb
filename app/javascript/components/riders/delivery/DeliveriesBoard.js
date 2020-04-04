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

    const [listItems, setListItems] = useState([]);

    // Fetch all the deliveries of the rider
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
                filerAndSetVisibleDeliveries(result.data);
            }).catch(error => console.log(error));
    }, []);

    // Filter the deliveries accordingly
    useEffect(() => {
        filerAndSetVisibleDeliveries(deliveries);
    }, [deliveriesType]);

    useEffect(() => {
        setListItems(visibleDeliveries.map(delivery => {
            return (
                <ListGroupItem key={delivery.oid}>
                    <Delivery delivery={delivery} onTimeUpdated={onTimeUpdated}/>
                </ListGroupItem>
            )
        }));
    }, [visibleDeliveries])

    const setDeliveriesAndVisibleDeliveries = (deliveries) => {
        setDeliveries(deliveries);
        filerAndSetVisibleDeliveries(deliveries);
    };

    const filerAndSetVisibleDeliveries = (deliveries) => {
        let result = [];
        if (DELIVERIES_TYPES.ongoing === deliveriesType) {
            result = deliveries.filter(delivery => !delivery.order_delivered_time);
        } else if (DELIVERIES_TYPES.complete === deliveriesType) {
            result = deliveries.filter(delivery => !!delivery.order_delivered_time);
        }
        setVisibleDeliveries(result);
    };

    const onTimeUpdated = (id, updatedTime) => {         
        const newDeliveries = [...deliveries];
        newDeliveries.find(delivery => delivery.oid === id)[updatedTime.name] = moment(updatedTime.time);
        setDeliveriesAndVisibleDeliveries(newDeliveries);        
    };

    const nav = [{ key: DELIVERIES_TYPES.ongoing, value: "Ongoing" },
        { key: DELIVERIES_TYPES.complete, value: "Complete" }];

    return (
        <CustomList
            nav={nav}
            defaultActiveKey={DELIVERIES_TYPES.ongoing}
            onSelect={(selectedType) => setDeliveriesType(selectedType)}
            items={listItems}/>
    )
};

export default DeliveriesBoard;