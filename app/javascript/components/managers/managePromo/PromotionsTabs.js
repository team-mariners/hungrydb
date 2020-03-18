import React from 'react';
import Nav from 'react-bootstrap/Nav';

const PromotionTabs = () => {
    return (
        <Nav variant="tabs" defaultActiveKey="ongoing">
            <Nav.Item>
                <Nav.Link eventKey="ongoing">Ongoing</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link eventKey="closed">Closed</Nav.Link>
            </Nav.Item>
        </Nav>
    )
};

export default PromotionTabs;