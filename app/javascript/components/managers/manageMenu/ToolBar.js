import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

const ToolBar = (props) => {
    const foodCategories = props.foodCategories.map(category => (
        <Dropdown.Item
            key={category.id}
            as={Link}
            to={`/manager/manage_menu/food_category/${category.id}`}
            onClick={() => props.setCurrFoodCategoryId(category.id)}>
            {category.name}
        </Dropdown.Item>
    ));

    let categoryActions = (
        <Dropdown className="mr-sm-3">
            <Dropdown.Toggle>Category Actions</Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={props.setEditCategoryVisible}>Edit Category</Dropdown.Item>
                <Dropdown.Item onClick={props.setDeleteCategoryVisible}>Delete Category</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )

    if (props.currFoodCategoryId == undefined) {
        categoryActions = null;
    } 

    return (
        <div className="manageMenu-toolbar">
            <Button className="mr-sm-3" onClick={props.setNewDishVisible}>New Dish</Button>
            <Button className="mr-sm-3" onClick={props.setNewCategoryVisible}>New Category</Button>

            <Dropdown className="mr-sm-3">
                <Dropdown.Toggle>Filter</Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        as={Link}
                        to="/manager/manage_menu"
                        onClick={() => props.setCurrFoodCategoryId(undefined)}>
                        View All
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