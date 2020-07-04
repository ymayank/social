import React from 'react';
import { Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Home from '../screens/home/Home';

export default function Router() {
    return(
        <BrowserRouter>
          <Switch>      
            <Route exact path="/" component={Login}/>
            <Route exact path="/sign-up" component={Signup}/>
            <Route exact path="/forgot-password" component={ForgotPassword}/>
            <PrivateRoute exact path="/home" component={Home}/>
            <Redirect from='*' to='/' />
          </Switch> 
        </BrowserRouter>
    )
} 