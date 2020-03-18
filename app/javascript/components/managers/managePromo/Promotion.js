import React from 'react';
import CustomCard from '../../utilities/CustomCard/CustomCard';
import CardLeftSide from '../../utilities/CustomCard/CardLeftSide';
import CardRightSide from '../../utilities/CustomCard/CardRightSide';
import CardFooter from '../../utilities/CustomCard/CardFooter';
import Button from 'react-bootstrap/Button';

const Promotion = (props) => {
    return (
        <CustomCard>
            <CardLeftSide>
                <p><b>Name: </b>{props.promotion.p_name}</p>
                <p><b>Promo code: </b>{props.promotion.promocode}</p>
                <p><b>Start date & time: </b>{props.promotion.start_date}</p>
                <p><b>End date & time: </b>{props.promotion.end_date}</p>
            </CardLeftSide>

            <CardRightSide>
                <p><b>Percentage: </b>{props.promotion.percentage}</p>
                <p><b>Maximum Redeem: </b>{props.promotion.max_redeem}</p>
                <p><b>Number Redeemed: </b>{props.promotion.num_redeemed}</p>
            </CardRightSide>

            <CardFooter>
                <Button >Edit</Button>
            </CardFooter>
        </CustomCard>
    )
};

export default Promotion;