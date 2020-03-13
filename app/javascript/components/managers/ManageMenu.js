import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToolBar from './manageMenu/ToolBar';
import NewDish from './manageMenu/NewDish';
import DishesList from './manageMenu/DishesList';
import DeleteDish from './manageMenu/DeleteDIsh';
import EditDish from './manageMenu/EditDish';
import NewMenuSection from './manageMenu/NewMenuSection';
import EditMenuSection from './manageMenu/EditMenuSection';
import DeleteMenuSection from './manageMenu/DeleteMenuSection';

const ManageMenu = (props) => {
    const [isNewDishVisible, setIsNewDishVisible] = useState(false);
    const [isDeleteDishVisible, setIsDeleteDishVisible] = useState(false);
    const [isEditDishVisible, setIsEditDishVisible] = useState(false);
    const [dishId, setDishId] = useState(null); // for deleteDish
    const [dish, setDish] = useState(null); // for editDish
    const [dishes, setDishes] = useState([]);
    const [visibleDishes, setVisibleDishes] = useState([]);

    const [isNewMenuSectionVisible, setIsNewMenuSectionVisible] = useState(false);
    const [isEditMenuSectionVisible, setIsEditMenuSectionVisible] = useState(false);
    const [isDeleteMenuSectionVisible, setIsDeleteMenuSectionVisible] = useState(false);
    const [menuSections, setMenuSections] = useState([]);
    const [currMenuSectionId, setCurrMenuSectionId] = useState(props.match.params.id);

    // be triggered in subsequent rerendering if the array [] that is passed to it as parameter changes,
    // which in this case it will never change since the array [] is never modified.
    useEffect(() => {
        axios.get("/foods")
        .then(result => {
            console.log(result);
            setDishesAndVisibleDishes(result.data);
        }).catch(error => {
            console.log(error.message);
        })

        axios.get("/menu_sections")
        .then(result => {
            console.log(result);
            setMenuSections(result.data);
        }).catch(error => {
            console.log(error.message);
        })
    }, []);

    // Use for react router when the user choose a menu section to filter.
    useEffect(() => {
        filterAndSetVisibleDishes(dishes);
    }, [currMenuSectionId]);

    const setDishesAndVisibleDishes = (dishes) => {
        setDishes(dishes);
        filterAndSetVisibleDishes(dishes);
    }

    const filterAndSetVisibleDishes = (dishes) => {
        if (currMenuSectionId == undefined) {
            setVisibleDishes(dishes);
            return;
        }

        const filteredDishes = dishes.filter(dish => dish.menu_section.url_id == currMenuSectionId);
        setVisibleDishes(filteredDishes);
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
        setDishesAndVisibleDishes(newDishes);
        props.alerts.showSuccessAlert("New dish created! =D");
    };

    const handleDishDeleted = (id) => {
        const newDishes = [...dishes];
        const index = getDishIndex(id, newDishes);
        newDishes.splice(index, 1);

        console.log(newDishes)
        setDishesAndVisibleDishes(newDishes);
        props.alerts.showSuccessAlert("Dish deleted! =D");
    };

    const handleDishEdited = (id, editedDish) => {
        const newDishes = [...dishes];
        const index = getDishIndex(id, newDishes);
        newDishes.splice(index, 1, editedDish);

        setDishesAndVisibleDishes(newDishes);
        props.alerts.showSuccessAlert("Dish edited! =D");
    };

    const getDishIndex = (id, dishes) => {
        return dishes.findIndex(dish => dish.id === id);
    };

    const getCurrentMenuSection = () => {
        if (currMenuSectionId === undefined) {
            return undefined;
        } 

        return menuSections.find(section => section.url_id == currMenuSectionId);
    }

    const handleNewMenuSectionCreated = (newMenuSection) => {
        const newMenuSections = [...menuSections, newMenuSection];
        setMenuSections(newMenuSections);
        props.alerts.showSuccessAlert("New menu section created!");
    }

    const handleMenuSectionEdited = (editedMenuSection) => {
        const newMenuSections = [...menuSections];
        const index = newMenuSections.findIndex(section => section.url_id == editedMenuSection.url_id);
        newMenuSections.splice(index, 1, editedMenuSection);

        console.log(editedMenuSection);

        const newDishes = dishes.map(dish => {
            if (dish.menu_section.url_id === editedMenuSection.url_id) {
                dish.menu_section = editedMenuSection;
            } 

            return dish;
        })

        setMenuSections(newMenuSections);
        setDishesAndVisibleDishes(newDishes);
        props.alerts.showSuccessAlert("Menu section edited!");
    }

    const handleMenuSectionDeleted = (url_id) => {
        const newMenuSections = [...menuSections];
        const index = newMenuSections.findIndex(section => section.url_id === url_id);
        newMenuSections.splice(index, 1);
        setMenuSections(newMenuSections);
        
        props.history.replace("/manager/manage_menu");
        setCurrMenuSectionId(undefined);
        props.alerts.showSuccessAlert("Menu section deleted!");
    }

    return (
        <div className="p-3">
            <h1>Menu</h1>
            <ToolBar
                showNewDish={() => setIsNewDishVisible(true)}
                showNewMenuSection={() => setIsNewMenuSectionVisible(true)}
                showEditMenuSection={() => setIsEditMenuSectionVisible(true)}
                showDeleteMenuSection={() => setIsDeleteMenuSectionVisible(true)}
                menuSections={menuSections}
                currMenuSectionId={currMenuSectionId}
                setCurrMenuSectionId={setCurrMenuSectionId}/>
            <DishesList
                dishes={visibleDishes}
                showDeleteDish={showDeleteDish}
                showEditDish={showEditDish}
                currMenuSection={getCurrentMenuSection()}/>
            <NewDish
                show={isNewDishVisible}
                onClose={() => setIsNewDishVisible(false)}
                onDishCreated={handleDishCreated}
                menuSections={menuSections}
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
                menuSections={menuSections}
                {...props}/>
            <NewMenuSection
                show={isNewMenuSectionVisible}
                onClose={() => setIsNewMenuSectionVisible(false)}
                onNewMenuSectionCreated={handleNewMenuSectionCreated}
                {...props}/>
            <EditMenuSection
                show={isEditMenuSectionVisible}
                onClose={() => setIsEditMenuSectionVisible(false)}
                getCurrentMenuSection={getCurrentMenuSection}
                onMenuSectionEdited={handleMenuSectionEdited}
                {...props}/>
            <DeleteMenuSection
                show={isDeleteMenuSectionVisible}
                onClose={() => setIsDeleteMenuSectionVisible(false)}
                currMenuSectionId={currMenuSectionId}
                onMenuSectionDeleted={handleMenuSectionDeleted}
                {...props}/>
        </div>
    )
};

export default ManageMenu;