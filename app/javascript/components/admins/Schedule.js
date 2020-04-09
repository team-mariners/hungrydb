import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as Yup from 'yup';
import axios from 'axios';

const Schedule = (props) => {
    const [isEditingSchedule, setIsEditingSchedule] = useState(false);
    // Transpose the schedule matrix
    if (props.userid != null) {
        var riderSchedule = props.riderSchedule[0].map((col, i) => props.riderSchedule.map(row => row[i]));
    }
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

    const handleEditSchedule = () => {
        if (!isEditingSchedule) {
            setIsEditingSchedule(true);
        } else {
            const schedule = riderSchedule[0].map((col, i) => riderSchedule.map(row => row[i]))
            axios.post('/admin/updateschedule', {
                rid: props.userid,
                schedule: schedule
            }).then((response) => {
                if (response.data == false) {
                    const message = "The rider's schedule cannot be updated!";
                    console.log(message);
                } else {
                    window.location.assign('/admin/schedule/' + props.userid);
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    const handleScheduleChange = (event) => {
        const parts = event.currentTarget.value.split("-");
        var value = 0;
        if (parts[2] === 'blank') {
            value = 0;
        } else {
            value = 1;
        }
        riderSchedule[parseInt(parts[0])][parseInt(parts[1])] = value;
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
                {(formik) => displayForm(formik)}
            </Formik>
        );
    }

    const displayEditScheduleButton = () => {
        return (
            <React.Fragment>
                <Button variant="primary" type="submit" onClick={handleEditSchedule} sm={1}>
                    Edit Schedule
                </Button>
                <p>&nbsp;</p>
            </React.Fragment>
        )
    }

    const displayRiderSchedule = (props) => {
        console.log(riderSchedule);
        const intervalValues = intervals.map((val, i) => {
            return (
                <tr>
                    <td>{val}</td>
                    {riderSchedule[i].map((val, j) => {
                        const key = i + "-" + j;
                        const inactive = key + "-blank";
                        const active = key + "-active";
                        var value = (val == 0) ? inactive : active;
                        const display = (val == 0) ? "" : "Active";
                        const selection = (<Form.Control
                            name="role"
                            defaultValue={value}
                            onChange={handleScheduleChange}
                            as="select"
                        >
                            <option key={inactive} value={inactive}></option>
                            <option key={active} value={active}>Active</option>
                        </Form.Control>);
                        const output = (isEditingSchedule) ? selection : display;
                        return (<td>{output}</td>);
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
                    {displayEditScheduleButton()}
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
