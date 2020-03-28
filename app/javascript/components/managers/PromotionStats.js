import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PromoStatsTable from './statistics/PromoStatsTable';
import { momentisePromotionDateTime } from '../helpers/PromotionHelpers';

const PromotionStats = () => {
    const [summary, setSummary] = useState([]);

    useEffect(() => {
        axios.get("/api/v1/statistics/promotions_summary")
        .then(result => {
            console.log(result);
            result.data.forEach(momentisePromotionDateTime);
            setSummary(result.data);
        }).catch(console.log)
    }, []);

    return (
        <div className="p-3">
            <h1 style={{textDecoration: "underline"}}>Promotions Summary</h1>
            <PromoStatsTable
                className="my-3"
                summary={summary}/>
        </div>
    )
};

export default PromotionStats;