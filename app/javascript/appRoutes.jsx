import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import UserList from './src/pages/users/index';

class AppRoutes extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path='/' component={UserList} />
                </Switch>
            </React.Fragment>
        )
    }
}


export default AppRoutes;