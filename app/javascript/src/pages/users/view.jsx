import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    showLoader, pushError, pushSuccess,
} from '../../../redux/actions';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import EmailIcon from '@material-ui/icons/Email';
import MobileFriendlyIcon from '@material-ui/icons/MobileFriendly';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import api from '../../api/index';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    }
});

class UserView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: 'Users View',
            user: []
        }
        this.getData();
    }

    getData() {
        self = this
        api.app.get('/users/' + this.props.match.params.id)
            .then(function (response) {
                // handle success                
                self.setState({
                    user: response.data.user
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

    render() {
        const { classes, history } = this.props;
        console.log(this.state)
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Toolbar className='w-100'>
                        <IconButton onClick={history.goBack}>
                            <BackIcon /></IconButton>
                        <Typography component="h1" variant="h5">
                            {this.state.title}
                        </Typography>
                        <div className='flex-grow-1' />
                    </Toolbar>

                    <List component="nav">
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={this.state.user.name} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <EmailIcon />
                            </ListItemIcon>
                            <ListItemText primary={this.state.user.email} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <MobileFriendlyIcon />
                            </ListItemIcon>
                            <ListItemText primary={this.state.user.contact} />
                        </ListItem>
                    </List>
                </Paper>
            </main>
        )
    }
}

UserView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserView);

