import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import 'flag-icon-css/css/flag-icon.css';
import 'bootstrap/scss/bootstrap.scss';

// redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appState from './redux/reducers';
const store = createStore(appState)

import CssBaseline from '@material-ui/core/CssBaseline';
import MuiTheme from './css/muiTheme';
import ToolbarSpace from './css/toolbarSpace';

import AppRoutes from './appRoutes';
import AppTopBar from './src/common/appBar';
import AppDrawer from './src/common/appDrawer';

import currentUser from './src/helper/auth';

class Root extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      drawerOpen: false,
    }
  }

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  render() {
    return (
      <Provider store={store}>
        <Router basename='/dashboard'>
          <MuiTheme>
            <CssBaseline />
            {currentUser.access_token && <AppTopBar openDrawer={this.toggleDrawer} />}
            {currentUser.access_token && <AppDrawer open={this.state.drawerOpen} onClose={this.toggleDrawer} />}
            <ToolbarSpace />
            <div className='container-fluid'>
              <AppRoutes />
            </div>
          </MuiTheme>
        </Router>
      </Provider>
    )
  }
}

export default Root;

