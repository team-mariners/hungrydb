import React from 'react';
import SignUpForm from './SignUpForm';
import { Route } from 'react-router-dom';
import Navigation from './Navigation';
import LoginForm from './LoginForm';

const Container = () => {
    return (
        <div className="container-signup-login">
            <Navigation/>
            <Route path="/signup" render={() => <SignUpForm/>}/>
            <Route path="/login" render={() => <LoginForm/>}/>
        </div>
    )
};

export default Container;