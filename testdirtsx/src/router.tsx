import * as React from "react";
import { Suspense } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect, RouteProps } from "react-router-dom";
import { MAINTENANCE_MODE } from 'src/env';

import PageApp from 'src/view/app';
import AuthAPI from "./api/auth";
import PageLogin from "./view/auth/login";
import PagePasswordForgot from "./view/auth/password-forgot";
import PageRegister from "./view/auth/register";
import PageError_404 from "./view/error/404";
import PageAccount from 'src/view/auth/account';
import PagePasswordReset from "src/view/auth/password-reset";



const Soute: (routeProps: RouteProps) => JSX.Element =
    ({ component: Component, ...rest }) => // eslint-disable-line react/prop-types
        <Route
            {...rest}
            render={(moreProps) => {
                if (!AuthAPI.isLoggedIn || AuthAPI.user === null)
                    return <Redirect to={{ pathname: '/auth/login', state: moreProps.location }} />
                return <Component {...moreProps} />
            }
            } />


export function App() {
    if (MAINTENANCE_MODE)
        return <>No Page</>

    return <Router>
        <Suspense fallback={<div>Loading route...</div>}>
            <Switch>
                <Soute exact path="/" component={PageApp} />
                <Soute path="/auth/account" component={PageAccount} />
                <Route path="/auth/login" component={PageLogin} />
                <Route path="/auth/register/:email?" component={PageRegister} />
                <Route path="/auth/password-reset/:code?" component={PagePasswordReset} />
                <Route path="/auth/forgotPassword" component={PagePasswordForgot} />

                {/* <Soute path="/contributions" component={PageApp} />
                <Soute path="/invoices/selectPlus" component={PageApp} />
                <Soute path="/invoices/accessPlus" component={PageApp} /> */}
                <Soute path="/selectPlus" component={PageApp} />
                <Soute path="/accessPlus" component={PageApp} />
                <Soute path="/employers" component={PageApp} />
                <Soute path="/members" component={PageApp} />
                <Route component={PageError_404} />
            </Switch>
        </Suspense>
    </Router>
}
