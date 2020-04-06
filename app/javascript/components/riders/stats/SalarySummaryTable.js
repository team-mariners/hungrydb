import React from 'react';
import Table from 'react-bootstrap/Table';

const SalarySummaryTable = (props) => {
    const salary = !!props.summary.salary ? `$ ${parseFloat(props.summary.salary).toFixed(2)}` : "$ 0.00";
    const commission = !!props.summary.commission ? `$ ${parseFloat(props.summary.commission).toFixed(2)}` : "$ 0.00";
    
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
                    <td>{salary}</td>                                            
                </tr>
                
                <tr>
                    <td>Total commision</td>
                    <td>{commission}</td>
                </tr>

                <tr>
                    <td>Total number of orders</td>
                    <td>{props.summary.total_completed_orders}</td>
                </tr>

                <tr>
                    <td>Total number of hours worked</td>
                    <td>{props.summary.total_hours_worked}</td>
                </tr>
            </tbody>
        </Table>
    )
};

export default SalarySummaryTable;