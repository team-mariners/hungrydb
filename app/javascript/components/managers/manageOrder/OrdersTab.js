import React from 'react';
import Nav from 'react-bootstrap/Nav';

const OrdersTab = (props) => {
    return (
        <Nav variant="tabs">
            <Nav.Item>
                <Nav.Link eventkey="ongoing">Ongoing</Nav.Link>
            </Nav.Item>
            
            <Nav.Item>
                <Nav.Link eventkey="past">Past</Nav.Link>
            </Nav.Item>
        </Nav>
    )
};

export default OrdersTab;