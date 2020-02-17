import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route } from 'react-router-dom';
import NaviBar from './NaviBar';
import LoginForm from '../users/main/LoginForm';
import SignUpForm from '../users/main/SignUpForm';

export default function Home() {
    return (
        <Router>
            <NaviBar/>
            <Route path="/login" render={() => <LoginForm/>}/>
            <Route path="/signup" render={() => <SignUpForm/>}/>
        </Router>
    )
};
