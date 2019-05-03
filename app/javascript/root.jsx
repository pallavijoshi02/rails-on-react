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

import AppRoutes from './appRoutes';
import AppTopBar from './src/common/appBar';
import AppDrawer from './src/common/appDrawer';

import currentUser from './src/helper/auth';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

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
    const { classes } = this.props;
    return (
      <Provider store={store}>
        <Router basename='/dashboard'>
          <div className={classes.root}>
            {currentUser.access_token && <AppTopBar openDrawer={this.toggleDrawer} />}
            {currentUser.access_token && <AppDrawer open={this.state.drawerOpen} onClose={this.toggleDrawer} />}
            <AppRoutes />
          </div>
        </Router>
      </Provider>
    )
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Root);

