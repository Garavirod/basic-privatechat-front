import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LoginView } from '../views/LoginView';
import { RegisterView } from '../views/RegisterView';

export const AuthRouter = () => {
    return ( 
        <Switch>
            <Route exact path="/auth/login" component={ LoginView }/>
            <Route exact path="/auth/register" component={ RegisterView }/>
            <Redirect to="/auth/login"/>
        </Switch>
    )
}