import React from 'react';
import DeliveriesBoard from './delivery/DeliveriesBoard';

const ManageDeliveries = (props) => {    
    return (
        <div className="page">
            <h1>Deliveries</h1>            
            <DeliveriesBoard {...props}/>
        </div>        
    )
};

export default ManageDeliveries;