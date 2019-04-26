import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import UserList from './src/pages/users/index';
import UserForm from './src/pages/users/form';
import UserView from './src/pages/users/view';
import Flash from './src/common/flash';

class AppRoutes extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path='/' component={UserList} />
                    <Route path='/user-form/new' component={UserForm} />
                    <Route path='/user-form/:id' component={UserForm} />
                    <Route path='/user-view/:id' component={UserView} />
                </Switch>
                <Flash />
            </React.Fragment>
        )
    }
}

export default AppRoutes;