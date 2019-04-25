import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});

class Flash extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.isOpen,
        })
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, message } = this.props

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{message}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        )
    }

}

Flash.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Flash);

