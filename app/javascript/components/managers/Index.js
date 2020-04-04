import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import NavigationBar from './common/NavigationBar';
import Dashboard from './Dashboard';
import ManageOrders from './ManageOrders';
import ManageMenu from './ManageMenu';
import ManagePromo from './ManagePromo';
import ManageInfo from './ManageInfo';
import PromotionStats from './PromotionStats';

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
            <NavigationBar/>
            <Alert dismissible variant={alertVariant} show={isAlertVisible} onClose={closeAlert}>
                {alertMessage}
            </Alert>
            <Switch>
                <Route exact path="/" render={() => <Dashboard {...props}/>}/>
                <Route exact path="/manager/orders" render={() => <ManageOrders {...alerts}/>}/>
                <Route exact path="/manager/promo_stats" render={() => <PromotionStats/>}/>
                <Route exact path={["/manager/manage_menu/menu_sections/:id", "/manager/manage_menu"]}
                    render={(props) => <ManageMenu {...alerts} {...props}/>}/>
                <Route exact path="/manager/manage_promo" render={() => <ManagePromo {...alerts}/>}/>
                <Route exact path="/manager/manage_info" render={() => <ManageInfo {...props}/>}/>
            </Switch>
       </Router>
    )
};

export default Index;
