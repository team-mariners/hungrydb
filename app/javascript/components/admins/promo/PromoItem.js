import React from 'react';
import moment from 'moment-timezone';
import momentDurationFormatSetup from 'moment-duration-format';
import Button from 'react-bootstrap/Button';
import { dateTimeFormat } from '../../utilities/Constants';
import CustomCard from '../../utilities/CustomCard/CustomCard';
import CardLeftSide from '../../utilities/CustomCard/CardLeftSide';
import CardRightSide from '../../utilities/CustomCard/CardRightSide';
import CardFooter from '../../utilities/CustomCard/CardFooter';

momentDurationFormatSetup(moment);

const PromoItem = (props) => {
    var editButton = <Button onClick={() => props.showEditPromo(props.promo)}>Edit</Button>;

    if (props.promoType === 'closed') {
        editButton = null;
    }

    const duration = moment.duration(moment(props.promo.end_datetime).diff(props.promo.start_datetime));

    return (
        <CustomCard>
            <CardLeftSide>
                <p><b>Name: </b>{props.promo.p_name}</p>
                <p><b>Promo code: </b>{props.promo.promocode}</p>
                <p><b>Start date & time: </b>{moment(props.promo.start_datetime).format(dateTimeFormat)}</p>
                <p><b>End date & time: </b>{moment(props.promo.end_datetime).format(dateTimeFormat)}</p>
                <p><b>Duration: </b>{duration.format()}</p>
            </CardLeftSide>

            <CardRightSide>
                <p><b>Percentage: </b>{props.promo.percentage}</p>
                <p><b>Maximum Redeem: </b>{props.promo.max_redeem}</p>
                <p><b>Number Redeemed: </b>{props.promo.num_redeemed}</p>
            </CardRightSide>

            <CardFooter>
                {editButton}
            </CardFooter>
        </CustomCard>
    )
}

export default PromoItem;
