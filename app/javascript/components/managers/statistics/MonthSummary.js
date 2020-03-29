import React from 'react';
import Table from 'react-bootstrap/Table';

const MonthSummary = (props) => {
    let dishes = "-";

    if (props.summary.popular_dishes.length > 0) {
        dishes = (
            <ol>
                {
                    props.summary.popular_dishes.map((dishName) => {
                        return <li key={dishName}>{dishName}</li>
                    })
                }
            </ol>
        )
    }

    return (
        <div {...props}>
            <Table striped bordered style={{ width: "60%" }}>
                <thead>
                    <tr>
                        <th>Summary</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td><b>Total Orders</b></td>
                        <td>{props.summary.total_orders}</td>
                    </tr>

                    <tr>
                        <td><b>Total Orders Earning (Excluding Delivery)</b></td>
                        <td>$ {parseFloat(props.summary.total_cost).toFixed(2)}</td>
                    </tr>

                    <tr>
                        <td><b>Top 5 Favourite Dishes</b></td>
                        <td>
                            {dishes}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
};

export default MonthSummary;