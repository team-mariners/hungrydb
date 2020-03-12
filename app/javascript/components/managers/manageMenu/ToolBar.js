import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

const ToolBar = (props) => {
    const menuSections = props.menuSections.map(menuSection => (
        <Dropdown.Item
            key={menuSection.url_id}
            as={Link}
            to={`/manager/manage_menu/food_category/${menuSection.url_id}`}
            onClick={() => props.setCurrMenuSectionId(menuSection.url_id)}>
            {menuSection.ms_name}
        </Dropdown.Item>
    ));

    let categoryActions = (
        <Dropdown className="mr-sm-3">
            <Dropdown.Toggle>Section Actions</Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={props.showEditMenuSection}>Edit Section</Dropdown.Item>
                <Dropdown.Item onClick={props.showDeleteMenuSection}>Delete Section</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )

    if (props.currMenuSectionId == undefined) {
        categoryActions = null;
    } 

    return (
        <div className="manageMenu-toolbar">
            <Button className="mr-sm-3" onClick={props.showNewDish}>New Dish</Button>
            <Button className="mr-sm-3" onClick={props.showNewMenuSection}>New Section</Button>

            <Dropdown className="mr-sm-3">
                <Dropdown.Toggle>Filter</Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        as={Link}
                        to="/manager/manage_menu"
                        onClick={() => props.setCurrMenuSectionId(undefined)}>
                        All Dishes
                    </Dropdown.Item>
                    {menuSections}
                </Dropdown.Menu>
            </Dropdown>

            {categoryActions}

            <Form inline={true}>
                <FormControl type="text" className="mr-sm-2" placeholder="Search Dishes" />
                <Button type="button" variant="outline-success">Search</Button>
            </Form>
        </div>
    )
};

export default ToolBar;