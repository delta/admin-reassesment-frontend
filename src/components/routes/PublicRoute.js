import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../utils/authUtils';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Redirect to="/forms" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;
