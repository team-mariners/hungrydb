import React from 'react';
import moment from 'moment-timezone';
import momentDurationFormatSetup from 'moment-duration-format';
import CustomCard from '../../utilities/CustomCard/CustomCard';
import CardLeftSide from '../../utilities/CustomCard/CardLeftSide';
import CardRightSide from '../../utilities/CustomCard/CardRightSide';
import CardFooter from '../../utilities/CustomCard/CardFooter';
import Button from 'react-bootstrap/Button';
import { dateTimeFormat } from '../../utilities/Constants';

momentDurationFormatSetup(moment);

const Promotion = (props) => {
    let editButton = <Button onClick={() => props.showEditPromo(props.promotion)}>Edit</Button>;

    if (props.promotionsType === 'closed') {
        editButton = null;
    }

    const duration = moment.duration(props.promotion.end_datetime.diff(props.promotion.start_datetime));

    return (
        <CustomCard>
            <CardLeftSide>
                <p><b>Name: </b>{props.promotion.p_name}</p>
                <p><b>Promo code: </b>{props.promotion.promocode}</p>
                <p><b>Start date & time: </b>{props.promotion.start_datetime.format(dateTimeFormat)}</p>
                <p><b>End date & time: </b>{props.promotion.end_datetime.format(dateTimeFormat)}</p>
                <p><b>Duration: </b>{duration.format()}</p>
            </CardLeftSide>

            <CardRightSide>
                <p><b>Percentage: </b>{props.promotion.percentage}</p>
                <p><b>Maximum Redeem: </b>{props.promotion.max_redeem}</p>
                <p><b>Number Redeemed: </b>{props.promotion.num_redeemed}</p>
                <p><b>Total Order Cost:</b></p>
            </CardRightSide>

            <CardFooter>
                {editButton}
            </CardFooter>
        </CustomCard>
    )
};

export default Promotion;