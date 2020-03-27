import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

const OrderHistoryItem = (props) => {
    let promocodeAndDiscount = <h6>Promo { props.order.promocode + ": " + props.order.promo_discount }% discount</h6>;
    if (!props.order.promocode) {
        promocodeAndDiscount = <h6>No promocode was used</h6>
    }

    return (
            <ListGroup.Item variant="info" style={{color: "black", textAlign: "center"}}>
                <h4>{ props.order.restaurant_name.replace("Z", "").toString().split() }</h4>

                <h5>${ parseFloat(props.order.total_price).toFixed(2) }</h5>

                <h5>{ props.order.date_time.toString().split("T")[0] + ", " +
                        props.order.date_time.toString().split("T")[1].split(".")[0] }
                </h5>

                {promocodeAndDiscount}
            </ListGroup.Item>
    )
}

export default OrderHistoryItem;
