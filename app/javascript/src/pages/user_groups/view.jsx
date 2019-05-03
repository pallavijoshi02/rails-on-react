import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    showLoader, pushError, pushSuccess,
} from '../../../redux/actions';
import { withRouter } from 'react-router-dom'
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

class UserGroupView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {            
            result: []
        }
        this.getData();
    }

    getData() {
        self = this
        api.app.get('/user_groups/' + this.props.match.params.id)
            .then(function (response) {
                // handle success                
                self.setState({
                    result: response.data.result
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
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Toolbar className='w-100'>
                        <IconButton onClick={this.props.history.goBack}>
                            <BackIcon />
                        </IconButton>
                        <div className='flex-grow-1' />
                        <Typography component="h1" variant="h5" className='px-0 px-md-3'>
                            {I18n.t('user_group.view.heading')}
                        </Typography>
                        <div className='flex-grow-1' />
                    </Toolbar>

                    <List component="nav">
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={this.state.result.name} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <EmailIcon />
                            </ListItemIcon>
                            <ListItemText primary={this.state.result.permision} />
                        </ListItem>                        
                    </List>
                </Paper>
            </main>
        )
    }
}

UserGroupView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(UserGroupView)))