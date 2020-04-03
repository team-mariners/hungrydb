import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import CustomCard from '../../utilities/CustomCard/CustomCard';
import CardFooter from '../../utilities/CustomCard/CardFooter';
import OrderModal from '../../managers/manageOrder/OrderModal';
import { dateTimeFormat2 } from '../../utilities/Constants';

const Delivery = (props) => {    
    const [isLoadOrder, loadOrder] = useState(false);
    const [isShowOrder, showOrder] = useState(false);    
    const [order, setOrder] = useState(null);    
    
    useEffect(() => {
        // If the rider wants to view an order and the order has not been fetched yet
        if (isLoadOrder) {
            axios.get(`/rider/order/${props.delivery.oid}`)
                .then(result => {
                    console.log(result);
                    setOrder(result.data);
                    showOrder(true);
                    loadOrder(false);
                }).catch(error => {
                    console.log(error);
                });
        }
    }, [isLoadOrder]);

    const orderTime = props.delivery.order_time.format(dateTimeFormat2);
    const departToRestaurantTime = !!props.delivery.depart_to_restaurant_time
        ? props.delivery.depart_to_restaurant_time.format(dateTimeFormat2) : "-";
    const arriveAtRestaurantTime = !!props.delivery.arrive_at_restaurant_time
        ? props.delivery.arrive_at_restaurant_time.format(dateTimeFormat2) : "-";
    const departToCustomerTime = !!props.delivery.depart_to_customer_time
        ? props.delivery.depart_to_customer_time.format(dateTimeFormat2) : "-";
    const orderDeliveredTime = !!props.delivery.order_delivered_time
        ? props.delivery.order_delivered_time.format(dateTimeFormat2) : "-";

    return (
        <React.Fragment>
            <CustomCard>
                <div>
                    <p><b>Order ID: </b>{props.delivery.oid}</p>
                    <p><b>Restaurant: </b>{props.delivery.restaurant_name}</p>
                    <p><b>Restaurant Location: </b>{props.delivery.restaurant_address}</p>
                    <p><b>Customer Location: </b>{props.delivery.customer_location}</p>
                    <p><b style={{textDecoration: "underline"}}>Time</b></p>
                    <p><b>Order Time: </b>{orderTime}</p>                    
                    <p><b>Depart to Restaurant Time: </b>{departToRestaurantTime}</p>                
                    <p><b>Arrive at Restaurant Time: </b>{arriveAtRestaurantTime}</p>                                
                    <p><b>Depart to Customer Time: </b>{departToCustomerTime}</p>
                    <p><b>Order Delivered Time: </b>{orderDeliveredTime}</p>
                </div>

                <CardFooter>                
                    <Button onClick={() => loadOrder(true)} disabled={isLoadOrder}>View Order</Button>                
                </CardFooter>                        
            </CustomCard>                                    

            <OrderModal
                isRider={true}
                order={order}
                show={isShowOrder}    
                onClose={() => showOrder(false)}/>
        </React.Fragment>
    )
};

export default Delivery;