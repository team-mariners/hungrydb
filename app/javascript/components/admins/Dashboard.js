import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = (props) => {
    return (
        <div className="p-3">
            <h2>Welcome to the admins dashboard, {props.currentUser.username}!</h2>
            <p>This page contains useful links for the management of this HungryDB instance.</p>
            <h3>Useful links</h3>
            <ul>
                <li><Link to="/admin/promotions">HungryDB promotions</Link></li>
                <li><Link to="/admin/roles">Roles management</Link></li>
                <li><Link to="/admin/statistics">Statistics</Link></li>
            </ul>
       </div>
    )
}

export default Dashboard;
