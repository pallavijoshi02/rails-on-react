import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import { withStyles } from '@material-ui/core/styles';

const defaultToolbarStyles = {
    iconButton: {
    },
};

class CustomToolbar extends React.Component {

    render() {
        const { classes, addRecord, reloadRecord } = this.props;
        return (
            <React.Fragment>
                <Tooltip title={I18n.t('actions.add')}>
                    <IconButton className={classes.iconButton} onClick={addRecord}>
                        <AddIcon />
                    </IconButton>                    
                </Tooltip>
                <Tooltip title={I18n.t('actions.refresh')}>
                    <IconButton className={classes.iconButton} onClick={reloadRecord}>
                        <RefreshIcon />
                    </IconButton>                    
                </Tooltip>
            </React.Fragment>
        );
    }
}

export default withStyles(defaultToolbarStyles)(CustomToolbar);