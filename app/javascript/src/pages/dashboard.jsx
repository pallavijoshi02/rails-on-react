import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    showLoader, pushError, pushSuccess,
} from '../../redux/actions';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({    
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
});


const INITIAL_STATE = {
}

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE };
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {I18n.t('dashboard.heading')}
                </Typography>
            </Paper>
        )
    }
}



Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showLoader: () => dispatch(showLoader()),
        pushSuccess: (msg, args) => dispatch(pushSuccess(msg, args)),
        pushError: (msg, args) => dispatch(pushError(msg, args))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Dashboard));