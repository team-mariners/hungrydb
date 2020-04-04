import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToolBar from './manageMenu/ToolBar';
import NewDish from './manageMenu/NewDish';
import DishesList from './manageMenu/DishesList';
import ToggleDish from './manageMenu/ToggleDish';
import EditDish from './manageMenu/EditDish';
import NewMenuSection from './manageMenu/NewMenuSection';
import EditMenuSection from './manageMenu/EditMenuSection';
import DeleteMenuSection from './manageMenu/DeleteMenuSection';

const ManageMenu = (props) => {
    const [isNewDishVisible, setIsNewDishVisible] = useState(false);
    const [isToggleDishVisible, setIsToggleDishVisible] = useState(false);
    const [isEditDishVisible, setIsEditDishVisible] = useState(false);
    const [dish, setDish] = useState(null); // for editDish and toggleDish
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

    const showToggleDishIsActive = (dish) => {
        setDish(dish);
        setIsToggleDishVisible(true);
    };

    const showEditDish = (dish) => {
        setDish(dish);
        setIsEditDishVisible(true);
    };

    const handleDishCreated = (newDish) => {
        const newDishes = [...dishes, newDish];
        setDishesAndVisibleDishes(newDishes);
        props.showSuccessAlert("New dish created! =D");
    };

    const handleDishDeactivated = (deactivatedDish) => {
        updateDishes(deactivatedDish.id, deactivatedDish);
        props.showSuccessAlert(`Dish ${deactivatedDish.is_active? "Activated" : "Deactivated"}! =D`);
    };

    const handleDishEdited = (id, editedDish) => {
        updateDishes(id, editedDish);
        props.showSuccessAlert("Dish edited! =D");
    };

    const updateDishes = (id, editedDish) => {
        const newDishes = [...dishes];
        const index = getDishIndex(id, newDishes);
        newDishes.splice(index, 1, editedDish);
        setDishesAndVisibleDishes(newDishes);
    }

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
        props.showSuccessAlert("New menu section created!");
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
        props.showSuccessAlert("Menu section edited!");
    }

    const handleMenuSectionDeleted = (url_id) => {
        const newMenuSections = [...menuSections];
        const index = newMenuSections.findIndex(section => section.url_id === url_id);
        newMenuSections.splice(index, 1);
        setMenuSections(newMenuSections);
        
        props.history.replace("/manager/manage_menu");
        setCurrMenuSectionId(undefined);
        props.showSuccessAlert("Menu section deleted!");
    }

    return (
        <div className="manager-page">
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
                showToggleDishIsActive={showToggleDishIsActive}
                showEditDish={showEditDish}
                currMenuSection={getCurrentMenuSection()}/>
            <NewDish
                show={isNewDishVisible}
                onClose={() => setIsNewDishVisible(false)}
                onDishCreated={handleDishCreated}
                menuSections={menuSections}
                {...props}/>
            <ToggleDish
                dish={dish}
                show={isToggleDishVisible}
                onClose={() => setIsToggleDishVisible(false)}
                onDishDeactivated={handleDishDeactivated}
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