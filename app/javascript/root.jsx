import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import api from './src/api';
import MUIDataTable from "mui-datatables";


const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
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

const columns = ["Name", "Email", "Contact", "Updated at"];

const options = {
  filterType: 'checkbox',
};

class Root extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: 'React on Rails',
      drawerOpen: false,
      users: []
    }

    this.getData();
  }

  getData() {
    self = this
    api.app.get('/users')
      .then(function (response) {
        // handle success
        console.log(response);
        self.setState({
          users: response.data.users.map((row) => ([
            row.name || '',
            row.email || '',
            row.contact || '',
            row.created_at
          ]))
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {this.state.title}
            </Typography>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        <MUIDataTable
          title={"Users List"}
          data={this.state.users}
          columns={columns}
          options={options}
        />


      </div>
    )
  }

}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Root);

