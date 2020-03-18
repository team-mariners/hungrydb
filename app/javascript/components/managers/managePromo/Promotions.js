import React from 'react';
import Card from 'react-bootstrap/Card';
import PromotionTabs from './PromotionsTabs';
import PromotionsList from './PromotionsList';

const Promotions = () => {
    return (
        <Card>
            <Card.Header>
                <PromotionTabs />
            </Card.Header>
            <PromotionsList />
        </Card>
    )
};

export default Promotions;