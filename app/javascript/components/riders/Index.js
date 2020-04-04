import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import RiderNaviBar from './common/RiderNaviBar';
import DashBoard from './DashBoard';
import ManageDeliveries from './ManageDeliveries';

const csrfToken = document.querySelector('[name=csrf-token').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

const Index = (props) => {
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertVariant, setAlertVariant] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const closeAlert = () => setIsAlertVisible(false);

    const showSuccessAlert = (message) => {
        setAlertVariant('success');
        showAlert(message);
    }

    const showFailureAlert = (message) => {
        setAlertVariant('danger')
        showAlert(message);
    }

    const showAlert = (message) => {
        setAlertMessage(message);
        setIsAlertVisible(true);

        // Scroll to top of page
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    const alerts = {
        showSuccessAlert: showSuccessAlert,
        showFailureAlert: showFailureAlert
    }

    return (
        <Router>
            <RiderNaviBar/>        
            <Alert dismissible variant={alertVariant} show={isAlertVisible} onClose={closeAlert}>
                {alertMessage}
            </Alert>
            <Switch>
                <Route exact path="/" render={() => <DashBoard {...props}/>}/>
                <Route exact path="/rider/deliveries" render={() => <ManageDeliveries {...alerts}/>}/>
            </Switch>            
        </Router>
    )
};

export default Index;