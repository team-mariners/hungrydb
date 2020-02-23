import React from 'react';
import SignUpForm from './SignUpForm';
import { Route } from 'react-router-dom';
import Navigation from './Navigation';
import LoginForm from './LoginForm';

const Container = (props) => {
    return (
        <div className="container-signup-login">
            <Navigation/>
            <Route path="/signup" render={() => <SignUpForm showAlert={props.showAlert}/>}/>
            <Route path="/login" render={() => <LoginForm showAlert={props.showAlert}/>}/>
        </div>
    )
};

export default Container;