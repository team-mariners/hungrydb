import React from 'react';
import RiderNaviBar from './RiderNaviBar';


const RiderHomepage = () => {
    return (
        <div>
            <RiderNaviBar />
            <div>
                <h1>Hi, username !!</h1>
                <br></br>
                <h2><u>My Schedule</u></h2>
                <ul>
                    <li>Monday    : - </li>
                    <li>Tuesday   : - </li>
                    <li>Wednesday : - </li>
                    <li>Thursday  : - </li>
                    <li>Friday    : - </li>
                    <li>Saturday  : - </li>
                    <li>Sunday    : - </li>
                </ul>
                <br></br>
                <h2><u>Total Orders Completed</u></h2>
                <ul>
                    <li>This month : </li>
                    <li>This year: </li>
                    <li>Since joined: </li>
                </ul>
            </div>
        </div>
    )
};

export default RiderHomepage;