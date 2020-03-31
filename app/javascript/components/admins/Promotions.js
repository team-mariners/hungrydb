import React, { useState } from 'react';
import moment from 'moment-timezone';
import Button from 'react-bootstrap/Button';
import EditPromo from './promo/EditPromo';
import NewPromo from './promo/NewPromo';
import PromoList from './promo/PromoList';

const Promotions = (props) => {
    const [newPromoForm, showNewPromoForm] = useState(false);
    const [editPromoForm, showEditPromoForm] = useState(false);
    const [promoType, setPromoType] = useState("ongoing");
    const [promo, setPromo] = useState(null);

    const isOngoing = (promo) => {
        return moment(promo.start_datetime).isSameOrBefore(moment()) && moment(promo.end_datetime).isAfter(moment());
    };

    const isScheduled = (promo) => {
        return moment(promo.start_datetime).isAfter(moment());
    };

    const isClosed = (promo) => {
        return moment(promo.end_datetime).isBefore(moment());
    };

    const filteredPromos = (promos) => {
        if (promoType == "ongoing") {
            return promos.filter((promo) => isOngoing(promo))
        } else if (promoType == "scheduled") {
            return promos.filter((promo) => isScheduled(promo))
        } else {
            return promos.filter((promo) => isClosed(promo))
        }
    }

    const handlePromoCreated = (props) => {
        showNewPromoForm(false);
        window.location.assign(window.location);
    }

    const handlePromoEdited = (props) => {
        showEditPromoForm(false);
        window.location.assign(window.location);
    }

    const showNewPromo = () => {
        showNewPromoForm(true);
    }

    const showEditPromo = (promo) => {
        setPromo(promo);
        showEditPromoForm(true);
    }

    return (
        <div className="p-3">
            <h2>HungryDB promotions</h2>
            <p>As an administrator, you can manage promotions that are applied on all restaurants.</p>

            <div className="manageMenu-toolbar mb-3">
                <Button onClick={showNewPromo}>New Promotion</Button>
            </div>

            <PromoList
                promos={filteredPromos(props.allPromos)}
                promoType={promoType}
                setPromoType={setPromoType}
                showEditPromo={showEditPromo}
            />
            <NewPromo
                show={newPromoForm}
                onClose={() => showNewPromoForm(false)}
                onPromoCreated={handlePromoCreated}
            />
            <EditPromo
                show={editPromoForm}
                onClose={() => showEditPromoForm(false)}
                promo={promo}
                onPromoEdited={handlePromoEdited}
            />
        </div>
    )
};

export default Promotions;
