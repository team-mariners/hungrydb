import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToolBar from './manageMenu/ToolBar';
import NewDish from './manageMenu/NewDish';
import DishesList from './manageMenu/DishesList';
import DeleteDish from './manageMenu/DeleteDIsh';
import EditDish from './manageMenu/EditDish';
import NewFoodCategory from './manageMenu/NewFoodCategory';

const ManageMenu = (props) => {
    const [isNewDishVisible, setIsNewDishVisible] = useState(false);
    const [isDeleteDishVisible, setIsDeleteDishVisible] = useState(false);
    const [isEditDishVisible, setIsEditDishVisible] = useState(false);
    const [dishId, setDishId] = useState(null); // for deleteDish
    const [dish, setDish] = useState(null); // for editDish
    const [dishes, setDishes] = useState([]);
    const [visibleDishes, setVisibleDishes] = useState([]);

    const [isNewCategoryVisible, setIsNewCategoryVisible] = useState(false);
    const [foodCategories, setFoodCategories] = useState([]);

    const [currFoodCategoryId, setCurrFoodCategoryId] = useState(props.match.params.id);

    // be triggered in subsequent rerendering if the array [] that is passed to it as parameter changes,
    // which in this case it will never change since the array [] is never modified.
    useEffect(() => {
        axios.get("/foods")
        .then(result => {
            console.log(result)
            setDishes(result.data);
            setVisibleDishes(filterDishes(result.data));
        }).catch(error => {
            console.log(error.message);
        })

        axios.get("/food_categories")
        .then(result => {
            console.log(result)
            setFoodCategories(result.data);
        }).catch(error => {
            console.log(error.message);
        })
    }, []);

    useEffect(() => {
        if (currFoodCategoryId == undefined) {
            setVisibleDishes(dishes);
            return;
        }

        const filteredDishes = filterDishes(dishes);
        setVisibleDishes(filteredDishes);
    }, [currFoodCategoryId]);

    const filterDishes = (dishes) => {
        console.log(currFoodCategoryId);
        if (currFoodCategoryId == undefined) {
            return dishes;
        } else {
            return dishes.filter(dish => dish.food_category_id == currFoodCategoryId);
        }
    }

    const showDeleteDish = (id) => {
        setDishId(id);
        setIsDeleteDishVisible(true);
    };

    const showEditDish = (dish) => {
        setDish(dish);
        setIsEditDishVisible(true);
    };

    const handleDishCreated = (newDish) => {
        const newDishes = [...dishes, newDish];
        setDishes(newDishes);
        props.alerts.showSuccessAlert("New dish created! =D");
    };

    const handleDishDeleted = (id) => {
        const newDishes = [...dishes];
        const index = getDishIndex(id, newDishes);
        newDishes.splice(index, 1);

        console.log(newDishes);
        setDishes(newDishes);
        props.alerts.showSuccessAlert("Dish deleted! =D");
    };

    const handleDishEdited = (id, editedDish) => {
        const newDishes = [...dishes];
        const index = getDishIndex(id, newDishes);
        newDishes.splice(index, 1, editedDish);

        console.log(newDishes);
        setDishes(newDishes);
        props.alerts.showSuccessAlert("Dish edited! =D");
    };

    const getDishIndex = (id, dishes) => {
        return dishes.findIndex(dish => dish.id === id);
    };


    return (
        <div className="p-3">
            <h1>Menu</h1>
            <ToolBar
                setNewDishVisible={() => setIsNewDishVisible(true)}
                setNewCategoryVisible={() => setIsNewCategoryVisible(true)}
                foodCategories={foodCategories}
                setCurrFoodCategoryId={setCurrFoodCategoryId}/>
            <DishesList
                dishes={visibleDishes}
                showDeleteDish={showDeleteDish}
                showEditDish={showEditDish}/>
            <NewDish
                show={isNewDishVisible}
                onClose={() => setIsNewDishVisible(false)}
                onDishCreated={handleDishCreated}
                {...props}/>
            <DeleteDish
                dishId={dishId}
                show={isDeleteDishVisible}
                onClose={() => setIsDeleteDishVisible(false)}
                onDishDeleted={handleDishDeleted}
                {...props}/>
            <EditDish
                dish={dish}
                show={isEditDishVisible}
                onClose={() => setIsEditDishVisible(false)}
                onDishEdited={handleDishEdited}
                {...props}/>
            <NewFoodCategory
                show={isNewCategoryVisible}
                onClose={() => setIsNewCategoryVisible(false)}
                {...props}/>
        </div>
    )
};

export default ManageMenu;