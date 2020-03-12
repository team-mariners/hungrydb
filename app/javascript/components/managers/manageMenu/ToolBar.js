import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

const ToolBar = (props) => {
    const foodCategories = props.foodCategories.map(menuSection => (
        <Dropdown.Item
            key={menuSection.ms_name}
            as={Link}
            to={`/manager/manage_menu/food_category/${menuSection.ms_name}`}
            onClick={() => props.setCurrFoodCategoryId(menuSection.ms_name)}>
            {menuSection.ms_name}
        </Dropdown.Item>
    ));

    let categoryActions = (
        <Dropdown className="mr-sm-3">
            <Dropdown.Toggle>Category Actions</Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={props.showEditCategory}>Edit Category</Dropdown.Item>
                <Dropdown.Item onClick={props.showDeleteCategory}>Delete Category</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )

    if (props.currFoodCategoryId == undefined) {
        categoryActions = null;
    } 

    return (
        <div className="manageMenu-toolbar">
            <Button className="mr-sm-3" onClick={props.showNewDish}>New Dish</Button>
            <Button className="mr-sm-3" onClick={props.showNewCategory}>New Category</Button>

            <Dropdown className="mr-sm-3">
                <Dropdown.Toggle>Filter</Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        as={Link}
                        to="/manager/manage_menu"
                        onClick={() => props.setCurrFoodCategoryId(undefined)}>
                        All Dishes
                    </Dropdown.Item>
                    {foodCategories}
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