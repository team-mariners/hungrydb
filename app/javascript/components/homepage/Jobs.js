import React from 'react';
import RiderNaviBar from './RiderNaviBar';


const Jobs = () => {
    return (
        <div>
        
        <RiderNaviBar />
            
        <h1>Here's your current task</h1>
        <ul>
            <li>
                <h3>ABC Cafe</h3>
                <ul>
                    <li>Customer name: </li>
                    <li>Customer address: </li>
                    <li>Price: </li>
                    <li>Order items:</li>
                    <ul>
                        <li>Pizza</li>
                        <li>French Fries</li>
                    </ul>
                </ul>
            </li>
        </ul>
        </div>
    )
};

export default Jobs;