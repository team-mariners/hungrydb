import React from 'react';
import UserTypeCarousel from './UserTypeCarousel';
import HomePromosCard from './HomePromosCard';

const HomeContainer = () => {
    return (
        <div>
            <UserTypeCarousel />
            <br/><br/><br/>
            <HomePromosCard />
            {/* <RestaurantsCard /> */}
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
};

export default HomeContainer;
