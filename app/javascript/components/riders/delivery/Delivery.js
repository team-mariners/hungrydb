import React from 'react';
import Button from 'react-bootstrap/Button';
import CustomCard from '../../utilities/CustomCard/CustomCard';
import CardFooter from '../../utilities/CustomCard/CardFooter';
import { dateTimeFormat2 } from '../../utilities/Constants';

const Delivery = (props) => {
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
        <CustomCard>
            <div>
                <p><b>Order ID: </b>{props.delivery.oid}</p>
                <p><b>Customer Location: </b>{props.delivery.customer_location}</p>
                <p><b>Order Time: </b>{orderTime}</p>
                <p><b>Depart to Restaurant Time: </b>{departToRestaurantTime}</p>                
                <p><b>Arrive at Restaurant Time: </b>{arriveAtRestaurantTime}</p>                                
                <p><b>Depart to Customer Time: </b>{departToCustomerTime}</p>
                <p><b>Order Delivered Time: </b>{orderDeliveredTime}</p>
            </div>

            <CardFooter>                
                <Button>View Order</Button>
            </CardFooter>
        </CustomCard>                                    
    )
};

export default Delivery;