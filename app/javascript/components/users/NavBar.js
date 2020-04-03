import React from 'react';
import AdminNavBar from '../admins/NavBar';
import CustomerNavBar from '../customers/CustomerNavBar';
import ManagerNavBar from '../managers/common/NavigationBar';
import RiderNavBar from '../riders/common/RiderNaviBar';
import DefaultNavBar from '../global/AppBar';

const NavBar = (props) => {
    const displayNavBar = (role) => {
        if (role === 'admin') {
            return (<AdminNavBar />);
        } else if (role === 'customer') {
            return (<CustomerNavBar />);
        } else if (role === 'manager') {
            return (<ManagerNavBar />);
        } else if (role === 'rider') {
            return (<RiderNavBar />);
        } else {
            return (<DefaultNavBar isLoggedIn={false} />);
        }
    }

    return (
        <React.Fragment>
            {displayNavBar(props.role)}
        </React.Fragment>
    );
};

export default NavBar;
