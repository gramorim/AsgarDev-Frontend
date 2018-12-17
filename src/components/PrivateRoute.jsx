import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { haveAccess } from "actions/userActions"; 

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => (
            haveAccess()? 
            <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )} />
    )
}

export default PrivateRoute;