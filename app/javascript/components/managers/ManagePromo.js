import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import PromotionsBoard from './managePromo/PromotionsBoard';
import ToolBar from './managePromo/ToolBar';

const ManagePromo = () => {
    const [promotions, setPromotions] = useState([]);
    const [visibilePromotions, setVisiblePromotions] = useState([]);
    const [promotionsType, setPromotionsType] = useState('ongoing');

    // ComponentDidMount: Fetch all promotions of this restaurant
    useEffect(() => {
        axios.get('/promotions')
        .then(result => {
            console.log(result)

            result.data.forEach(element => {
                element.start_date = moment.parseZone(element.start_date);
                element.end_date = moment.parseZone(element.end_date);
            });

            setPromotionsAndVisiblePromotions(promotionsType, result.data);
            console.log(result.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const handleSetPromotionsType = (type) => {
        setPromotionsType(type);
        filterAndSetVisiblePromotions(type, promotions);
    };

    const setPromotionsAndVisiblePromotions = (type, promotions) => {
        setPromotions(promotions);
        filterAndSetVisiblePromotions(type, promotions);
    }

    const filterAndSetVisiblePromotions = (type, promotions) => {
        let result = [];

        if (type === 'ongoing') {
            result = promotions.filter(promotion => {
                return promotion.end_date.isAfter(moment());
            })
        } else if (type === 'closed') {
            result = promotions.filter(promotion => {
                return promotion.end_date.isBefore(moment());
            })
        }

        console.log(result);
        setVisiblePromotions(result);
    }

    return (
        <div className="p-3">
            <h1>Promotions</h1>
            <ToolBar/>
            <PromotionsBoard
                promotions={visibilePromotions}
                promotionsType={promotionsType}
                setPromotionsType={handleSetPromotionsType}/>
        </div>
    )
};

export default ManagePromo;