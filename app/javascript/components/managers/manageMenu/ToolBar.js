import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

const ToolBar = () => {
    return (
        <div className="d-flex">
            <Button className="mr-sm-3">New Dish</Button>
            <Button className="mr-sm-3">New Category</Button>
            <Dropdown className="mr-sm-3">
                <Dropdown.Toggle>Filter</Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>View All</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>            

            <Form inline={true}>
                <FormControl type="text" className="mr-sm-2" placeholder="Search Dishes"/>
                <Button type="button" variant="outline-success">Search</Button>
            </Form>
        </div>
    )
};

export default ToolBar;