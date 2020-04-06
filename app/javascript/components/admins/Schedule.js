import React from 'react';
import Table from 'react-bootstrap/Table'
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as Yup from 'yup';
import axios from 'axios';

const Schedule = (props) => {
    const dow = [
        "",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
    const tableHeaders = dow.map((day) => {
        return (<th>{day}</th>);
    })
    const intervals = [];
    for (var i = 10; i < 22; i++) {
        var leftHour = (i % 12) || 12;
        var leftAmPm = i < 12 ? "AM" : "PM";
        var rightHour = ((i + 1) % 12) || 12;
        var rightAmPm = (i + 1) < 12 ? "AM" : "PM";
        intervals.push(leftHour + leftAmPm + " - " + rightHour + rightAmPm);
    }

    const validation = Yup.object({
        username: Yup.string().matches(/^\w+$/).required()
    });

    const initialVals = {
        username: (props.username == null) ? '' : props.username
    };

    const handleSubmit = (values, formik) => {
        axios.post('/admin/getriderid', {
            username: values.username
        }).then((response) => {
            if (response.data == false) {
                const message = "This rider does not exist!";
                console.log(message);
                formik.setErrors({username: "Invalid username"});
            } else {
                window.location.assign('/admin/schedule/' + response.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const displayForm = (formik) => {return (
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
                    <Form.Control.Feedback type="invalid">
                        Username is invalid or the specified user is not a rider.
                    </Form.Control.Feedback>
                </Col>
                <Col>
                    <Button variant="primary" type="submit" sm={1}>
                        Go
                    </Button>
                    <span sm={1}>&nbsp;&nbsp;</span>
                    <Button variant="secondary" sm={1} href="/admin/schedule">
                        Cancel
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    )}

    const displayRiderForm = () => {
        return (
            <Formik
                validationSchema={validation}
                initialValues={initialVals}
                onSubmit={handleSubmit}
            >
                {(props) => displayForm(props)}
            </Formik>
        );
    }

    const displayRiderSchedule = (props) => {
        // Transpose the schedule matrix
        const schedule = props.riderSchedule[0].map((col, i) => props.riderSchedule.map(row => row[i]));

        const intervalValues = intervals.map((val, i) => {
            return (
                <tr>
                    <td>{val}</td>
                    {schedule[i].map((val) => {
                        const value = (val == 0) ? '' : 'Active';
                        return (<td>{value}</td>);
                    })}
                </tr>
            );
        })

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {tableHeaders}
                    </tr>
                </thead>
                <tbody>
                    {intervalValues}
                </tbody>
            </Table>
        );
    }

    const displayScheduleTable = (props) => {
        // Transpose the schedule matrix
        const partTimeValues = props.partTimeSchedule[0].map((col, i) => props.partTimeSchedule.map(row => row[i]));
        const fullTimeValues = props.fullTimeSchedule[0].map((col, i) => props.fullTimeSchedule.map(row => row[i]));

        const intervalValues = intervals.map((val, i) => {
            return (
                <tr>
                    <td>{val}</td>
                    {partTimeValues[i].map((val, j) => {
                        return (<td>
                            <b>Total riders: {val + fullTimeValues[i][j]}</b>
                            <br />
                            Full-time: {fullTimeValues[i][j]}
                            <br />
                            Part-time: {val}
                        </td>);
                    })}
                </tr>
            );
        })

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {tableHeaders}
                    </tr>
                </thead>
                <tbody>
                    {intervalValues}
                </tbody>
            </Table>
        );
    }

    const displayPage = (props) => {
        if (props.userid == null) {
            return (
                <React.Fragment>
                    <p>This page shows the number of riders that are working for each interval.</p>
                    {displayScheduleTable(props)}
                    {displayRiderForm()}
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    {displayRiderForm()}
                    {displayRiderSchedule(props)}
                </React.Fragment>
            )
        }
    }

    return (
        <div className="p-3">
            <h2>Riders schedule</h2>
            {displayPage(props)}
        </div>
    );
}

export default Schedule;
