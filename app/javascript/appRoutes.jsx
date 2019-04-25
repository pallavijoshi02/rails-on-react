import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import UserList from './src/pages/users/index';
import UserForm from './src/pages/users/form';
import Flash from './src/common/flash';

class AppRoutes extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path='/' component={UserList} />
                    <Route path='/user-form' component={UserForm} />
                </Switch>
                <Flash />
            </React.Fragment>
        )
    }
}

export default AppRoutes;