import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';

/**
 * 
 * @param {*} props 
 * navItems: an array of {key: KEY, value: VALUE} objects for the navbar in the list. (key is for navigating,
 * value is the name of the tab that will be displayed)
 * 
 * items: an array of listgroup items. Each item must be pre-wrapped with react-bootstrap's <ListGroup.Item> (
 * refer OrderBoard).
 */
const CustomList = (props) => {
    const navItems = props.nav.map(link => {
        return (
            <Nav.Item key={link.key}>
                <Nav.Link eventkey={link.key}>{link.value}</Nav.Link>
            </Nav.Item>
        )
    });    

    return (
        <Card>
            <Card.Header>
                <Nav variant="tabs">
                    {navItems}
                </Nav>
            </Card.Header>

            <ListGroup variant="flush">
                {props.items}
            </ListGroup>
        </Card>
    )
};

export default CustomList;