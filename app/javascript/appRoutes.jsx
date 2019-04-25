import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import UserList from './src/pages/users/index';
import UserForm from './src/pages/users/form';

class AppRoutes extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path='/' component={UserList} />
                    <Route path='/user-form' component={UserForm} />
                </Switch>
            </React.Fragment>
        )
    }
}

export default AppRoutes;