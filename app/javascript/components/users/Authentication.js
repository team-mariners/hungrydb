import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './authentication/Container';
import Alert from 'react-bootstrap/Alert';
import AppBar from '../global/AppBar';

const Authentication = () => {
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const showAlert = (message) => {
        setErrorMessage(message);
        setIsAlertVisible(true);
    }
    
    return (
        <Router>
            <Alert
                dismissible
                variant="danger"
                show={isAlertVisible}
                onClose={() => setIsAlertVisible(false)}
            >
                {errorMessage}
            </Alert>
            <AppBar/>
            <Container showAlert={showAlert}/>
        </Router>
    )
};

export default Authentication;
