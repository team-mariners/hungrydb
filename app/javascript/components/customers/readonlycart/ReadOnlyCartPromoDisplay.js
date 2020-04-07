import React from 'react';
import secureStorage from '../../utilities/HungrySecureStorage';

const ReadOnlyCartPromoDisplay = (props) => {
    let promocode = secureStorage.getItem('used_promo_code');

    if (promocode) {
        return (
            <React.Fragment>
                <h4>
                    Promocode used: {promocode}
                </h4>
                <h4>
                    Discount: -${(props.totalCost * props.discountPercentage).toFixed(2)}
                                ({props.discountPercentage * 100}%)
                </h4>
                <div><br /><br /></div>
            </React.Fragment>
        )
    } else {
        return null;
    }
}

export default ReadOnlyCartPromoDisplay;
