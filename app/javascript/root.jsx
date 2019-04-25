import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppTopBar from './src/common/appBar';
import AppDrawer from './src/common/appDrawer';

import UserList from './src/pages/users/index';

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
      <div className={classes.root}>
        <AppTopBar openDrawer={this.toggleDrawer} />
        <AppDrawer open={this.state.drawerOpen} onClose={this.toggleDrawer} />
        <UserList />
      </div>
    )
  }

}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Root);

