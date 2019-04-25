import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {
    Snackbar, IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import SuccessIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/BugReport'
import InfoIcon from '@material-ui/icons/Help'
import { FLASH_ERROR, FLASH_SUCCESS, popFlash } from '../../redux/actions'
import withStyles from '@material-ui/core/styles/withStyles';
const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});


const icon_classes = 'muted mr-3'

const flashBGClass = (mode) => {
    if (mode === FLASH_ERROR)
        return 'bg-red-a100'
    if (mode === FLASH_SUCCESS)
        return 'bg-green-a100'
    return 'bg-bgrey-50'
}

const FlashIcon = (props) => {
    const { mode } = props
    if (mode === FLASH_ERROR)
        return (<ErrorIcon className={icon_classes} />)
    if (mode === FLASH_SUCCESS)
        return (<SuccessIcon className={icon_classes} />)
    return (<InfoIcon className={icon_classes} />)
}

class Flash extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { msgId, flash } = this.props
        const { msg, mode } = (flash || {})
        const open = !!flash

        return (
            <Snackbar disableWindowBlurListener key={msgId}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={3000}
                open={open}
                onClose={this.props.onDismiss}
                message={<span id="message-id"><FlashIcon mode={mode} />{msg}</span>}
                action={[
                    <IconButton key="close"
                        aria-label="Close" color="inherit"
                        onClick={this.props.onDismiss}>
                        <CloseIcon />
                    </IconButton>
                ]} ContentProps={{
                    classes: {
                        root: `w-mx100 flex-nowrap text-dark ${flashBGClass(mode)}`,
                    }
                }}
            />
        )
    }

}

Flash.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        msgId: state.errors.currentId,
        flash: state.errors.flash
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDismiss: () => {
            dispatch(popFlash())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Flash));



