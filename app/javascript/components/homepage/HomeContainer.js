import React from 'react'
import UserTypeCarousel from './UserTypeCarousel'
import HomePromosCard from './HomePromosCard'

const HomeContainer = () => {
    return (
        <div >
            <UserTypeCarousel />
            <br/><br/><br/>
            <div className='homepage-cards-container'>
                    <HomePromosCard />
            </div>
        </div>
    )
}

export default HomeContainer
