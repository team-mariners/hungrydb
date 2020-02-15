import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './SignUp';

const Main = () => {
    return (
        <div>
            <Router>
                <Route path="/signup" render={() => <SignUp/>}/>
            </Router>
        </div>
    )
}

export default Main;