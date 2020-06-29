import React from 'react';
import { Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import Home from '../screens/Home';

const Router=(props)=>{
    return(
        <BrowserRouter>
          <Switch>      
            <Route exact path="/" component={Home}/>
            <Redirect from='*' to='/' />
          </Switch> 
        </BrowserRouter>
    )
} 

export default Router;