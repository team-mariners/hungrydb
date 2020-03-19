import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import PromotionsBoard from './managePromo/PromotionsBoard';
import ToolBar from './managePromo/ToolBar';
import NewPromotion from './managePromo/NewPromotion';
import EditPromotion from './managePromo/EditPromotion';

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

            result.data.forEach(promotion => {
                momentiseDateTime(promotion);
            });

            setPromotionsAndVisiblePromotions(result.data);
            console.log(result.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    // Handle change in promotions type (view)
    useEffect(() => {
        filterAndSetVisiblePromotions(promotions);
    }, [promotionsType]);

    const momentiseDateTime = (promotion) => {
        promotion.start_datetime = moment.parseZone(promotion.start_datetime);
        promotion.end_datetime = moment.parseZone(promotion.end_datetime);
    }

    const setPromotionsAndVisiblePromotions = (promotions) => {
        setPromotions(promotions);
        filterAndSetVisiblePromotions(promotions);
    };

    const filterAndSetVisiblePromotions = (promotions) => {
        let result = [];

        if (promotionsType === 'ongoing') {
            result = promotions.filter(promotion => {
                return promotion.end_datetime.isAfter(moment());
            })
        } else if (promotionsType === 'closed') {
            result = promotions.filter(promotion => {
                return promotion.end_datetime.isBefore(moment());
            })
        }

        console.log(result);
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
                promotion={promotion}/>
        </div>
    )
};

export default ManagePromo;