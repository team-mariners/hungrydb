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
                        <td>: $ {parseFloat(props.info.restaurant.minOrderCost).toFixed(2)}</td>
                    </tr>

                    <tr>
                        <td><b>Tags</b></td>
                        <td>: </td>
                    </tr>
                </tbody>
            </Table>

            <Button>Edit Tags</Button>

            <footer className="text-muted mt-3">
                To edit other restaurant information, kindly contact the administrator =D
            </footer>
        </div>
    )
}

export default ManageInfo;