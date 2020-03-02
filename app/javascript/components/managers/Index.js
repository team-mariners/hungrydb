import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import NavigationBar from './common/NavigationBar';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Stats from './Stats';
import Reviews from './Reviews';
import ManageMenu from './ManageMenu';
import ManagePromo from './ManagePromo';
import ManageInfo from './ManageInfo';

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

    console.log(props);

    return (
        <Router>
            <NavigationBar/>
            <Alert dismissible variant={alertVariant} show={isAlertVisible} onClose={closeAlert}>
                {alertMessage}
            </Alert>
            <Route exact path="/" render={() => <Dashboard  currentUser={props.info}/>}/>
            <Route exact path="/manager/orders" render={() => <Orders/>}/>
            <Route exact path="/manager/stats" render={() => <Stats/>}/>
            <Route exact path="/manager/reviews" render={() => <Reviews/>}/>
            <Route exact path="/manager/manage_menu" render={() => <ManageMenu alerts={alerts}/>}/>
            <Route exact path="/manager/manage_promo" render={() => <ManagePromo/>}/>
            <Route exact path="/manager/manage_info" render={() => <ManageInfo/>}/>
        </Router>
    )
};

export default Index;