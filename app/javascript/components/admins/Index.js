import React from 'react';
import AppBar from '../global/AppBar';


const Index = (props) => {
    return (
        <React.Fragment>
            <AppBar isLoggedIn={true} />
            <h2>Hello {props.currentUser.username}!</h2>
            <p>This user was updated on the Admins table on {props.roleAttributes.updated_at}</p>
       </React.Fragment>
    )
}

export default Index;
