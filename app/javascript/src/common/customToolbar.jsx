import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const defaultToolbarStyles = {
    iconButton: {
    },
};

class CustomToolbar extends React.Component {

    render() {
        const { classes, addRecord } = this.props;
        return (
            <React.Fragment>
                <Tooltip title={I18n.t('actions.add')}>
                    <IconButton className={classes.iconButton} onClick={addRecord}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        );
    }
}

export default withStyles(defaultToolbarStyles)(CustomToolbar);