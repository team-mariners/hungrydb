import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import NaviBar from './NaviBar';

const Home = () => {
    return (
        <Router>
            <NaviBar/>
        </Router>
    )
};

export default Home;
