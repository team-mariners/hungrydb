import React from 'react';
import secureStorage from '../../utilities/HungrySecureStorage';

const CartPointsForm = () => {

    let pointsOffset = secureStorage.getItem('points_offset');

    if (pointsOffset) {
        return (
            <React.Fragment>
                <h4>
                    Points used: {pointsOffset * 10}
                </h4>
                <h4>
                    Offset (10 cents/point): -${pointsOffset.toFixed(2)}
                </h4>
                <div><br /><br /></div>
            </React.Fragment>
        )
    } else {
        return null;
    }
}

export default CartPointsForm;
