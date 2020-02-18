import React from 'react';
import UserTypeCarousel from './UserTypeCarousel';
import HomePromosCard from './HomePromosCard';
import HomeRestaurantsCard from './HomeRestaurantsCard'; 

const HomeContainer = () => {
    return (
        <div >
            <UserTypeCarousel />
            <br/><br/><br/>
            <div className='homepage-cards-child'><HomePromosCard className='homepage-cards-child' /></div>
            <div className='homepage-cards-child'><HomeRestaurantsCard className='homepage-cards-child' /></div>
        </div>
    )
};

export default HomeContainer;
