import React, { useState } from 'react';
import moment from 'moment-timezone';
import Button from 'react-bootstrap/Button';
import PromoList from './promo/PromoList.js';

const Promotions = (props) => {
    const [newPromoForm, showNewPromoForm] = useState(false);
    const [editPromoForm, showEditPromoForm] = useState(false);
    const [promoType, setPromoType] = useState("ongoing");

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

    const handleNewPromo = (props) => {
        showNewPromoForm(true);
    }


    const showEditPromo = (promo) => {
        showEditPromoForm(true);
    }

    return (
        <div className="p-3">
            <h2>HungryDB promotions</h2>
            <p>As an administrator, you can manage promotions that are applied on all restaurants.</p>

            <div className="manageMenu-toolbar mb-3">
                <Button onClick={handleNewPromo}>New Promotion</Button>
            </div>

            <PromoList
                promos={filteredPromos(props.allPromos)}
                promoType={promoType}
                setPromoType={setPromoType}
                showEditPromo={showEditPromo}
            />
            {/* <NewPromotion
                show={isNewPromoVisible}
                onClose={() => setIsNewPromoVisible(false)}
                onPromoCreated={handlePromoCreated}
                {...props}/>
            <EditPromotion
                show={isEditPromoVisible}
                onClose={() => setIsEditPromoVisibile(false)}
                promotion={promotion}
                onPromoEdited={handlePromoEdited}
                {...props}/> */}
        </div>
    )
};

export default Promotions;
