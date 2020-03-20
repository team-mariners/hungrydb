import React from 'react';
import CustomCard from '../../utilities/CustomCard/CustomCard';
import CardLeftSide from '../../utilities/CustomCard/CardLeftSide';
import CardRightSide from '../../utilities/CustomCard/CardRightSide';

const Order = (props) => {
    return (
        <CustomCard>
            <CardLeftSide>
                <p><b>Order ID: </b></p>
                <p><b>Customer: </b></p>
            </CardLeftSide>

            <CardRightSide>
                <p><b>Order date & time: </b></p>
                <p><b>Status: </b></p>
            </CardRightSide>
        </CustomCard>
    )
};

export default Order;