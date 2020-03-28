import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PromotionsBoard from './managePromo/PromotionsBoard';
import ToolBar from './managePromo/ToolBar';
import NewPromotion from './managePromo/NewPromotion';
import EditPromotion from './managePromo/EditPromotion';
import { momentisePromotionDateTime, isOngoing, isClosed, isScheduled } from '../helpers/PromotionHelpers';

const ManagePromo = (props) => {
    const [promotions, setPromotions] = useState([]);
    const [visibilePromotions, setVisiblePromotions] = useState([]);
    const [promotionsType, setPromotionsType] = useState('ongoing');

    const [isNewPromoVisible, setIsNewPromoVisible] = useState(false);
    const [isEditPromoVisible, setIsEditPromoVisibile] = useState(false);
    const [promotion, setPromotion] = useState(null); // For edit dish

    // ComponentDidMount: Fetch all promotions of this restaurant
    useEffect(() => {
        axios.get('/api/v1/promotions/index_restaurant')
        .then(result => {
            console.log(result)
            result.data.forEach(momentisePromotionDateTime);
            setPromotionsAndVisiblePromotions(result.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    // Handle change in promotions type (view)
    useEffect(() => {
        filterAndSetVisiblePromotions(promotions);
    }, [promotionsType]);

    const setPromotionsAndVisiblePromotions = (promotions) => {
        setPromotions(promotions);
        filterAndSetVisiblePromotions(promotions);
    };

    const filterAndSetVisiblePromotions = (promotions) => {
        let result = [];

        if (promotionsType === 'ongoing') {
            result = promotions.filter(promotion => isOngoing(promotion));
        } else if (promotionsType === 'scheduled') {
            result = promotions.filter(promotion => isScheduled(promotion));        
        } else if (promotionsType === 'closed') {
            result = promotions.filter(promotion => isClosed(promotion));                        
        }

        setVisiblePromotions(result);
    };

    const showEditPromo = (promotion) => {
        setPromotion(promotion);
        setIsEditPromoVisibile(true);
    };

    const handlePromoCreated = (newPromo) => {
        momentiseDateTime(newPromo);

        const newPromotions = [...promotions, newPromo];       
        setPromotionsAndVisiblePromotions(newPromotions);
        props.alerts.showSuccessAlert("New promotion created! =D");
    };    

    const handlePromoEdited = (editedPromo) => {
        momentiseDateTime(editedPromo);

        const editedPromotions = [...promotions];
        const index = editedPromotions.findIndex(promotion => promotion.id === editedPromo.id);
        editedPromotions.splice(index, 1, editedPromo);

        setPromotionsAndVisiblePromotions(editedPromotions);
        props.alerts.showSuccessAlert("Promotion edited! =D");
    };

    return (
        <div className="p-3">
            <h1>Promotions</h1>
            <ToolBar
                showNewPromo={() => setIsNewPromoVisible(true)}/>
            <PromotionsBoard
                promotions={visibilePromotions}
                promotionsType={promotionsType}
                setPromotionsType={setPromotionsType}
                showEditPromo={showEditPromo}/>
            <NewPromotion
                show={isNewPromoVisible}
                onClose={() => setIsNewPromoVisible(false)}
                onPromoCreated={handlePromoCreated}
                {...props}/>
            <EditPromotion
                show={isEditPromoVisible}
                onClose={() => setIsEditPromoVisibile(false)}
                promotion={promotion}
                onPromoEdited={handlePromoEdited}
                {...props}/>
        </div>
    )
};

export default ManagePromo;