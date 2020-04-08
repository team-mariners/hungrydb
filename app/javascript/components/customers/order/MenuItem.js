import React from 'react';
import Media from 'react-bootstrap/Media';
import placeholderPic from '../../../../assets/images/eggplant.jpg';
import FoodModal from './FoodModal';

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
        this.review_url = "/food/" + this.props.food.f_name + "/reviews";
        this.state = {showModal: false};
    }

    handleShowModal() {
        this.setState({showModal: true});
    }

    handleHideModal() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <>
                <FoodModal show={this.state.showModal} onClose={this.handleHideModal}
                    food={this.props.food} picture={placeholderPic}
                    onSubmitOrder={this.props.onSubmitOrder} />
                <button className='menu-media-button' onClick={this.handleShowModal}>
                    <Media>
                        <img
                            width={120}
                            height={120}
                            className="align-self-center mr-3"
                            src={placeholderPic}
                            alt="Generic placeholder"
                        />
                        <Media.Body>
                            <h5 />
                            <h3>{ this.props.food.f_name }</h3>
                            <h3>${ parseFloat(this.props.food.price).toFixed(2) }</h3>
                        </Media.Body>
                    </Media>
                </button>
                <a href={this.review_url}>See Related Reviews</a>
            </>
        )
    }
}

export default MenuItem;
