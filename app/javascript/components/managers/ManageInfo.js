import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const ManageInfo = (props) => {
    console.log(props);
    return (
        <div className="manager-page">
            <div className="mb-3">
                <h1>{props.info.restaurant.name}</h1>
            </div>

            <Table borderless size="sm" style={{width: "auto"}}>
                <tbody>
                    <tr>
                        <td><b>Address</b></td>
                        <td>: {props.info.restaurant.address}</td>
                    </tr>

                    <tr>
                        <td><b>Minimum Order Cost</b></td>
                        <td>: $ {parseFloat(props.info.restaurant.min_order_cost).toFixed(2)}</td>
                    </tr>
                </tbody>
            </Table>

            <footer className="text-muted mt-3">
                To edit restaurant information, kindly contact the administrator =D
            </footer>
        </div>
    )
}

export default ManageInfo;