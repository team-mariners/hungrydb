import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import userSlide from '../../../assets/images/food-laid-out.png';
import restaurantSlide from '../../../assets/images/japan-fukui-chef-happy.jpg';
import riderSlide from '../../../assets/images/mat-rempit.jpg';

const UserTypeCarousel = () => {
    return (
        <div className="homepage-carousel-background">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="homepage-carousel-image"
                        src={userSlide}
                    />

                    <Carousel.Caption>
                        <Button variant="warning" style={{paddingTop: '20px'}} href="/login">
                            <h4>Order Now!</h4>
                            <p>Customer Delivery</p>
                        </Button>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="homepage-carousel-image"
                        src={ restaurantSlide }
                    />

                    <Carousel.Caption>
                        <Button variant="danger" style={{paddingTop: '20px'}} href="/signup">
                            <h4>Join Us Today!</h4>
                            <p>Restaurant Sign Up</p>
                        </Button>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="homepage-carousel-image"
                        src={ riderSlide }
                    />

                    <Carousel.Caption>
                        <Button variant="light" style={{paddingTop: '20px'}} href="/signup">
                            <h5>Be Part Of Something Special!</h5>
                            <p>Delivery Rider Sign Up</p>
                        </Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default UserTypeCarousel;
