import React from 'react';
import CustomCard from '../../utilities/CustomCard/CustomCard';
import CardLeftSide from '../../utilities/CustomCard/CardLeftSide';
import CardRightSide from '../../utilities/CustomCard/CardRightSide';
import CardFooter from '../../utilities/CustomCard/CardFooter';
import Button from 'react-bootstrap/Button';

const Promotion = () => {
    return (
        <CustomCard>
            <CardLeftSide>
                <p><b>Name: </b>Halloween</p>
                <p><b>Promo code: </b>Halloween</p>
                <p><b>Start date: </b></p>
                <p><b>End date: </b></p>
            </CardLeftSide>

            <CardRightSide>
                <p><b>Percentage: </b></p>
                <p><b>Maximum Redeem: </b></p>
                <p><b>Number Redeemed: </b></p>
            </CardRightSide>

            <CardFooter>
                <Button >Edit</Button>
            </CardFooter>
        </CustomCard>
    )
};

export default Promotion;