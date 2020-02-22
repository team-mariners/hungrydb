import React from 'react';
import UserTypeCarousel from './UserTypeCarousel';
import HomePromosCard from './HomePromosCard';
import HomeRestaurantsCard from './HomeRestaurantsCard'; 

const HomeContainer = () => {
    return (
        <div >
            <UserTypeCarousel />
            <br/><br/><br/>
            <div className='homepage-cards-container'>
                <HomePromosCard />
                <HomeRestaurantsCard />
            </div>
        </div>
    )
};

export default HomeContainer;
