import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Promotions from './managePromo/Promotions';
import ToolBar from './managePromo/ToolBar';

const ManagePromo = () => {
    const [promotions, setPromotions] = useState([]);

    // ComponentDidMount: Fetch all promotions of this restaurant
    useEffect(() => {
        axios.get('/promotions')
        .then(result => {
            console.log(result)
            setPromotions(result.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div className="p-3">
            <h1>Promotions</h1>
            <ToolBar/>
            <Promotions promotions={promotions}/>
        </div>
    )
};

export default ManagePromo;