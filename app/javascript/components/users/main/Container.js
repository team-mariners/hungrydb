import React from 'react';
import SignUpForm from './SignUpForm';
import { Route } from 'react-router-dom';
import Navigation from './Navigation';

const Container = () => {
    return (
        <div className="container-signup-login">
            <Navigation/>
            <Route path="/signup" render={() => <SignUpForm/>}/>
        </div>
    )
};

export default Container;