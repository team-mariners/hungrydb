import React from 'react';
import moment from 'moment-timezone';
import momentDurationFormatSetup from 'moment-duration-format';
import Table from 'react-bootstrap/Table';
import { isOngoing, isScheduled, isClosed } from '../../helpers/PromotionHelpers';
import { dateTimeFormat } from '../../utilities/Constants';

// Set up the formatting for duration
momentDurationFormatSetup(moment);

const PromoStatsTable = (props) => {
    const now = moment();

    const rows = props.summary.map(promotion => {
        const duration = moment.duration(promotion.end_datetime.diff(promotion.start_datetime));                        
        const status = isOngoing(promotion, now) ? "Ongoing"
            : isScheduled(promotion, now) ? "Scheduled"
            : isClosed(promotion, now) ? "Closed" : "";

        return (
            <tr key={promotion.id}>
                <td>{promotion.p_name}</td>
                <td>{promotion.start_datetime.format(dateTimeFormat)}</td>
                <td>{promotion.end_datetime.format(dateTimeFormat)}</td>
                <td>{duration.format()}</td>
                <td>{status}</td>
                <td>{promotion.num_redeemed}</td>
                <td>{promotion.total_order_cost}</td>
            </tr>
        )
    });

    return (
        <Table striped bordered className={props.className}>
            <thead>
                <tr>
                    <th>Promotion Name</th>
                    <th>Start Datetime</th>
                    <th>End Datetime</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Number Redeemed</th>
                    <th>Total Order Cost (Excluding Delivery)</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>            
        </Table>
    )
};

export default PromoStatsTable;