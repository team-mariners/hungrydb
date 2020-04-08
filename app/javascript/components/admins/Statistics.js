import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import moment from 'moment-timezone';
import MonthPicker from '../utilities/MonthPicker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Statistics = (props) => {
    const [month, setMonth] = useState(moment());
    const [riderUsername, setRiderUsername] = useState('');
    const [performance, setPerformance] = useState({});
    const [deliveryStats, setDeliveryStats] = useState({});
    const currentMonth = month.startOf('month').format('MMMM YYYY').toString()

    const deliveryValidation = Yup.object({
        username: Yup.string().matches(/^\w+$/)
    });

    const deliveryInitialVals = {
        username: ''
    };

    useEffect(() => {
        getPerformanceStatistics();
        getDeliveryStatistics(riderUsername);
    }, [riderUsername, month]);

    const formatMoney = (value) => {
        const output = "$" + parseFloat(value).toFixed(2);
        return (<React.Fragment>{output}</React.Fragment>);
    }

    const formatTwoDP = (value) => {
        const output = parseFloat(value).toFixed(2);
        return (<React.Fragment>{output}</React.Fragment>);
    }

    const getPerformanceStatistics = () => {
        axios.post('/admin/getstatistics', {
            type: 'site',
            month: month.startOf('month').format('YYYY-MM').toString()
        }).then((response) => {
            if (response.data == false) {
                const message = "An error occurred when fetching statistics.";
                console.log(message);
            } else {
                setPerformance(response.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const getDeliveryStatistics = (userid) => {
        axios.post('/admin/getstatistics', {
            type: 'delivery',
            riderid: userid,
            month: month.startOf('month').format('YYYY-MM').toString()
        }).then((response) => {
            if (response.data == false) {
                const message = "An error occurred when fetching statistics.";
                console.log(message);
            } else {
                setDeliveryStats(response.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleDeliverySubmit = (values, formik) => {
        if (values.username == '') {
            setRiderUsername('');
        } else {
            axios.post('/admin/getriderid', {
                username: values.username
            }).then((response) => {
                if (response.data == false) {
                    const message = "This rider does not exist!";
                    console.log(message);
                    formik.setErrors({username: "Invalid username"});
                } else {
                    setRiderUsername(response.data);
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const displayDeliveryForm = () => {
        return (
            <Formik
                validationSchema={deliveryValidation}
                initialValues={deliveryInitialVals}
                onSubmit={handleDeliverySubmit}
            >
                {(formik) => {
                    return (
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group as={Row} controlId="formUsername">
                                <Form.Label column sm={2}>
                                    Enter a rider's username:
                                </Form.Label>
                                <Col sm={3}>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        isInvalid={formik.touched.username && !!formik.errors.username}
                                    />
                                    <Form.Text className="text-muted">
                                        Leave this field blank to see statistics for all riders.
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        Username is invalid or the specified user is not a rider.
                                    </Form.Control.Feedback>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit" sm={1}>
                                        Go
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    )
                }}
            </Formik>
        );
    }

    const displaySitePerformanceTable = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Total number of new customers for the month of {currentMonth}</td>
                        <td>{performance.newCustomers}</td>
                    </tr>

                    <tr>
                        <td>Total number of orders for the month of {currentMonth}</td>
                        <td>{performance.numOrders}</td>
                    </tr>

                    <tr>
                        <td>Total cost of all completed orders for the month of {currentMonth}</td>
                        <td>{formatMoney(performance.costOrders)}</td>
                    </tr>
                </tbody>
            </Table>
        );
    }

    const displayDeliveryPerformanceTable = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Total number of orders delivered for the month of {currentMonth}</td>
                        <td>{deliveryStats.numOrders}</td>
                    </tr>

                    <tr>
                        <td>Total number of hours worked for the month of {currentMonth}</td>
                        <td>{deliveryStats.numHours}</td>
                    </tr>

                    <tr>
                        <td>Total number of salary earned for the month of {currentMonth}</td>
                        <td>{formatMoney(deliveryStats.numSalary)}</td>
                    </tr>

                    <tr>
                        <td>Average delivery time for the month of {currentMonth}</td>
                        <td>{deliveryStats.avgDelivery}</td>
                    </tr>

                    <tr>
                        <td>Total number of ratings received for the month of {currentMonth}</td>
                        <td>{deliveryStats.numRatings}</td>
                    </tr>

                    <tr>
                        <td>Average rating received for the month of {currentMonth}</td>
                        <td>{formatTwoDP(deliveryStats.avgRating)}</td>
                    </tr>
                </tbody>
            </Table>
        );
    }

    const displayUserStatisticsTable = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Total number of users</td>
                        <td>{props.statistics.numUsers}</td>
                    </tr>

                    <tr>
                        <td>Total number of users who are admins</td>
                        <td>{props.statistics.numAdmins}</td>
                    </tr>

                    <tr>
                        <td>Total number of users who are restaurant managers</td>
                        <td>{props.statistics.numManagers}</td>
                    </tr>

                    <tr>
                        <td>Total number of users who are riders</td>
                        <td>{props.statistics.numRiders}</td>
                    </tr>

                    <tr>
                        <td>Total number of users who are customers</td>
                        <td>{props.statistics.numCustomers}</td>
                    </tr>
                </tbody>
            </Table>
        );
    }

    const displayRestaurantStatisticsTable = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Total number of restaurants</td>
                        <td>{props.statistics.numRestaurants}</td>
                    </tr>

                    <tr>
                        <td>Total number of food items</td>
                        <td>{props.statistics.numFood}</td>
                    </tr>
                </tbody>
            </Table>
        );
    }

    return (
        <div className="p-3">
            <h2>Statistics on HungryDB</h2>
            <p>This page provides some statistics on the HungryDB instance.</p>
            <MonthPicker
                month={month}
                setMonth={setMonth}
            />
            <h3>Site performance</h3>
            <p>Statistics on the site's performance for the given month.</p>
            {displaySitePerformanceTable()}

            <h3>Delivery performance</h3>
            <p>Statistics on the delivery of orders to customers.</p>
            {displayDeliveryForm()}
            {displayDeliveryPerformanceTable()}

            <h3>Users</h3>
            <p>Statistics on the total number of users in this HungryDB instance.</p>
            {displayUserStatisticsTable()}

            <h3>Restaurants</h3>
            <p>Statistics on the total number of restaurants and food items in this HungryDB instance.</p>
            {displayRestaurantStatisticsTable()}
        </div>
    )
}

export default Statistics;
