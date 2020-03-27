import React from 'react';
import PromoStatsTable from './statistics/PromoStatsTable';

const PromotionStats = () => {
    return (
        <div className="p-3">
            <h1 style={{textDecoration: "underline"}}>Promotions Summary</h1>
            <PromoStatsTable className="my-3"/>
        </div>
    )
};

export default PromotionStats;