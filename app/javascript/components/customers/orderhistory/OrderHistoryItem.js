import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment-timezone';
import { dateTimeFormat } from '../../utilities/Constants';
import OrderHistoryModal from './OrderHistoryModal';

class OrderHistoryItem extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.order = this.props.order;
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
        this.state = { showModal: false }
    }

    handleShowModal = () => {
        this.setState({ showModal: true });
    }

    handleHideModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        let promoDiscount = this.order.promo_discount
                            ? this.order.promo_discount
                            : 0;

        let promocodeAndDiscount = this.order.promocode
            ? <h6>
                Promo {this.order.promocode + ": "
                    + this.order.promo_discount}% discount
                                      </h6>
            : <h6>No promocode was used</h6>

        // Postgres stores numeric type total_price as string
        let amountPaid = parseFloat(this.order.total_price)
            - (parseFloat(this.order.total_price) - this.order.delivery_fee) * promoDiscount / 100
            - this.order.point_offset
        this.order["amount_paid"] = amountPaid;

        return (
            <React.Fragment>
                <OrderHistoryModal show={this.state.showModal} onClose={this.handleHideModal}
                    order={this.order} />

                <button onClick={this.handleShowModal}>
                    <ListGroup.Item variant="info" style={{ color: "black", textAlign: "center" }}>
                        <h4>{this.order.restaurant_name.replace("Z", "").toString().split()}</h4>

                        <h5>${parseFloat(amountPaid).toFixed(2)}</h5>

                        <h5>{moment.parseZone(this.order.date_time).format(dateTimeFormat)}
                        </h5>

                        {promocodeAndDiscount}
                    </ListGroup.Item>
                </button>
            </React.Fragment>
        )
    }
}

export default OrderHistoryItem;
