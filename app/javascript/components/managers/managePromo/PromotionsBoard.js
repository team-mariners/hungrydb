import React from 'react';
import Card from 'react-bootstrap/Card';
import PromotionTabs from './PromotionsTabs';
import PromotionsList from './PromotionsList';

const PromotionsBoard = (props) => {
    return (
        <Card>
            <Card.Header>
                <PromotionTabs {...props}/>
            </Card.Header>
            <PromotionsList {...props}/>
        </Card>
    )
};

export default PromotionsBoard;