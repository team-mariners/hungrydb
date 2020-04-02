import React, { useState } from 'react';
import CustomList from '../../utilities/CustomList';

const DeliveriesBoard = () => {
    const DELIVERIES_TYPES = {
        ongoing: "ongoing",
        complete: "complete"
    };

    const [deliveriesType, setDeliveriesType] = useState(DELIVERIES_TYPES.ongoing); 

    const nav = [{ key: DELIVERIES_TYPES.ongoing, value: "Ongoing" },
        { key: DELIVERIES_TYPES.complete, value: "Complete" }];

    return (
        <CustomList
            nav={nav}
            defaultActiveKey={DELIVERIES_TYPES.ongoing}
            onSelect={(selectedType) => setDeliveriesType(selectedType)}
            items={[]}/>
    )
};

export default DeliveriesBoard;