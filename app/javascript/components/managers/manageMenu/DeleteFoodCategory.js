import React from 'react';
import ConfirmationDialog from '../../utilities/ConfirmationDialog';

const DeleteFoodCategory = (props) => {
    const deleteCategory = () => {

    }

    return (
        <ConfirmationDialog onConfirm={deleteCategory} {...props}/>
    )
};

export default DeleteFoodCategory;