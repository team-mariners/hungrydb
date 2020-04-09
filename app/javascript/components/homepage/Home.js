import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import NaviBar from './NaviBar';
import HomeContainer from './HomeContainer';
import LoginForm from '../users/authentication/LoginForm';
import SignUpForm from '../users/authentication/SignUpForm';

export default function Home() {
    return (
        <Router>
            <NaviBar />
            <div>
                <br /><br /><br />
                <HomeContainer />
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            <Route path="/login" render={() => <LoginForm />} />
            <Route path="/signup" render={() => <SignUpForm />} />
        </Router>
    )
}
