import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import 'flag-icon-css/css/flag-icon.css';

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
      title: 'React on Rails',
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
            <div className='d-flex'>

              {currentUser.access_token && <AppTopBar openDrawer={this.toggleDrawer} />}
              {currentUser.access_token && <AppDrawer open={this.state.drawerOpen} onClose={this.toggleDrawer} />}
              <div className='d-flex flex-column min-vh-100 w-100'>
                <ToolbarSpace />
                <div className='d-flex flex-column flex-grow-1'>
                  <AppRoutes />
                </div>
              </div>

            </div>
          </MuiTheme>
        </Router>
      </Provider>
    )
  }
}

export default Root;

