import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import Flash from './src/common/flash';
import currentUser from './src/helper/auth';


import Login from './src/pages/login';
import Dashboard from './src/pages/dashboard';

import UserList from './src/pages/users/index';
import UserForm from './src/pages/users/form';
import UserView from './src/pages/users/view';

import UserGroupList from './src/pages/user_groups/index';
import UserGroupForm from './src/pages/user_groups/form';
import UserGroupView from './src/pages/user_groups/view';



const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        currentUser.access_token != null
            ?
            <Component {...props} />
            :
            <Redirect
                to={{
                    pathname: '/',
                    state: { from: props.location }
                }}
            />
    )} />
)

class AppRoutes extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    {!currentUser.access_token && <Redirect exact from='/' to='/login' />}
                    {currentUser.access_token && <Redirect exact from='/' to='/dashboard' />}
                    <Route path='/login' component={Login} />
                    <PrivateRoute path='/dashboard' component={Dashboard} />
                    
                    <PrivateRoute path='/users' component={UserList} />
                    <PrivateRoute path='/user-form/new' component={UserForm} />
                    <PrivateRoute path='/user-form/:id' component={UserForm} />
                    <PrivateRoute path='/user-view/:id' component={UserView} />
                    
                    <PrivateRoute path='/user-groups' component={UserGroupList} />
                    <PrivateRoute path='/user-group-form/new' component={UserGroupForm} />
                    <PrivateRoute path='/user-group-form/:id' component={UserGroupForm} />
                    <PrivateRoute path='/user-group-view/:id' component={UserGroupView} />
                </Switch>
                <Flash />
            </React.Fragment>
        )
    }
}

export default AppRoutes;