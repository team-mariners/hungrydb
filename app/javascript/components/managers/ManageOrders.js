import React from 'react';
import OrdersBoard from './manageOrder/OrdersBoard';

const ManageOrders = () => {
    return (
        <div className="p-3">
            <h1>All Orders</h1>
            <OrdersBoard/>
        </div>
    )
};

export default ManageOrders;