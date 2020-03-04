import React from 'react';
import Modal from '../../utilities/Modal';
import CategoryForm from './CategoryForm';

const NewFoodCategory = (props) => {
    const initialValues = {
        categoryName: ""
    };

    const createCategory = (values) => {
        console.log(values);
    };

    return (
        <Modal size="sm" {...props}>
            <h2>New Food Category</h2>
            <CategoryForm 
                buttonName="Create"
                initialValues={initialValues}
                handleSubmit={createCategory}/>
        </Modal>
    )
};

export default NewFoodCategory;