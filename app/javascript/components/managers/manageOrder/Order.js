import React from 'react';
import Button from 'react-bootstrap/Button';
import CustomCard from '../../utilities/CustomCard/CustomCard';
import CardLeftSide from '../../utilities/CustomCard/CardLeftSide';
import { dateTimeFormat } from '../../utilities/Constants';
import CardFooter from '../../utilities/CustomCard/CardFooter';

const Order = (props) => {
    console.log(props);

    return (
        <CustomCard>
            <CardLeftSide style={{width: "100%"}}>
                <p><b>Order ID: </b>{props.order.oid}</p>
                <p><b>Customer: </b>{props.order.customer_name}</p>
                <p><b>Order date & time: </b>{props.order.date_time.format(dateTimeFormat)}</p>                
                <p><b>Rider: </b>{!!props.order.rider_name ? props.order.rider_name : "-"}</p>
            </CardLeftSide>

            <CardFooter>
                <Button onClick={props.showOrder}>View</Button>
            </CardFooter>
        </CustomCard>
    )
};

export default Order;