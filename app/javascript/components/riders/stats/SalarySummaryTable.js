import React from 'react';
import Table from 'react-bootstrap/Table';

const SalarySummaryTable = () => {
    return (
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Summary</th>
                    <th>Data</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Total salary (base salary + comission)</td>
                    <td></td>                                            
                </tr>
                
                <tr>
                    <td>Total commision</td>
                    <td></td>
                </tr>

                <tr>
                    <td>Total number of orders</td>
                    <td></td>
                </tr>

                <tr>
                    <td>Total number of hours worked</td>
                    <td></td>
                </tr>
            </tbody>
        </Table>
    )
};

export default SalarySummaryTable;