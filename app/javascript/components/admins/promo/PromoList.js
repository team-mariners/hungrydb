import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import PromoItem from './PromoItem';

const PromoList = (props) => {
    const promos = props.promos.map(promo => {
        return (
            <ListGroup.Item key={promo.id}>
                <PromoItem
                    promo={promo}
                    showEditPromo={props.showEditPromo}
                    promoType={props.promoType}
                />
            </ListGroup.Item>
        )
    });

    return (
        <Card>
            <Card.Header>
                <Nav
                    variant="tabs"
                    defaultActiveKey={props.promoType}
                    onSelect={(value) => props.setPromoType(value)}
                >
                    <Nav.Item>
                        <Nav.Link eventKey="ongoing">Ongoing</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link eventKey="scheduled">Scheduled</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link eventKey="closed">Closed</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <ListGroup variant="flush">
                {promos}
            </ListGroup>
        </Card>
    )
}

export default PromoList;
