import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import 'flag-icon-css/css/flag-icon.css';
import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/css/font-awesome.min.css';

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

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

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
    const { classes } = this.props;
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
                <main className={classes.content}>
                  <div className='container-fluid'>
                    <AppRoutes />
                  </div>
                </main>
              </div>
            </div>
          </MuiTheme>
        </Router>
      </Provider >
    )
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Root);

