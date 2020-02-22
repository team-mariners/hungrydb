import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './Container';
import Alert from 'react-bootstrap/Alert';

const Main = () => {
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
            <Container showAlert={showAlert}/>
        </Router>
    )
};

export default Main;
