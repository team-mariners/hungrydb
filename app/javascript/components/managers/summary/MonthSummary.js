import React from 'react';
import Table from 'react-bootstrap/Table';

const MonthSummary = (props) => {
    const dishes = props.summary.popular_dishes.map((dishName) => {
        return <li key={dishName}>{dishName}</li>
    });

    return (
        <div {...props}>
            <h3 style={{textDecoration: "underline"}}>Summary</h3>

            <Table striped bordered style={{width: "60%"}}>
                <thead>
                    <tr>
                        <th>Summary</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td><b>Total Orders: </b></td>
                        <td>{props.summary.total_orders}</td>
                    </tr>                    

                    <tr>
                        <td><b>Total Orders Cost: </b></td>
                        <td>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Top 5 Favourite Dishes: </b></td>
                        <td>
                            <ol>
                                {dishes}
                            </ol>
                        </td>
                    </tr>
                </tbody>
            </Table>
       </div>
    )
};

export default MonthSummary;