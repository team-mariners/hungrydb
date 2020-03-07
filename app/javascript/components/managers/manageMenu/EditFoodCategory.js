import React from 'react';
import Modal from '../../utilities/Modal';
import FoodCategoryForm from './FoodCategoryForm';

const EditFoodCategory = (props) => {
    const currFoodCategory = props.getCurrentFoodCategory();
    let initialValues = {};

    if (!!currFoodCategory) {
        initialValues = { categoryName: currFoodCategory.name };
    } else {
        initialValues = { categoryName: "" };
    }

    const editCategory = (values) => {
        console.log(values);
    };

    return (
        <Modal size="sm" {...props}>
            <h2>Edit Food Category</h2>
            <FoodCategoryForm
                buttonName="Submit"
                initialValues={initialValues}
                handleSubmit={editCategory}/>
        </Modal>
    )
};

export default EditFoodCategory;