import React from 'react';
import Table from 'react-bootstrap/Table';

const PromoStatsTable = (props) => {
    return (
        <Table striped bordered className={props.className}>
            <thead>
                <tr>
                    <th>Promotion Name</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Number Redeemed</th>
                    <th>Total Order Cost (Excluding Delivery)</th>
                </tr>
            </thead>

            <tbody>

            </tbody>            
        </Table>
    )
};

export default PromoStatsTable;