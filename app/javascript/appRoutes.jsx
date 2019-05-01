import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import UserList from './src/pages/users/index';
import UserForm from './src/pages/users/form';
import UserView from './src/pages/users/view';
import Login from './src/pages/users/login';
import Flash from './src/common/flash';
import currentUser from './src/helper/auth';

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
                    {currentUser.access_token && <Redirect exact from='/' to='/' />}
                    <Route path='/login' component={Login} />
                    <PrivateRoute path='/dashboard' component={UserList} />
                    <PrivateRoute path='/users' component={UserList} />
                    <PrivateRoute path='/user-form/new' component={UserForm} />
                    <PrivateRoute path='/user-form/:id' component={UserForm} />
                    <PrivateRoute path='/user-view/:id' component={UserView} />
                </Switch>
                <Flash />
            </React.Fragment>
        )
    }
}

export default AppRoutes;