import React from 'react';
import Table from 'react-bootstrap/Table'

const ReadOnlyCartItemTable = (props) => {

    return (
        <Table bordered striped hover className='cart-table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Food</th>
                    <th>Single Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {props.items}
            </tbody>
        </Table>
    )
}

export default ReadOnlyCartItemTable;
