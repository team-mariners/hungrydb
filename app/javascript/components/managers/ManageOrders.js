import React from 'react';
import OrdersBoard from './manageOrder/OrdersBoard';

const ManageOrders = () => {
    return (
        <div className="p-3">
            <h2>All Orders</h2>
            <OrdersBoard/>
        </div>
    )
};

export default ManageOrders;