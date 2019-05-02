import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { NavLink } from 'react-router-dom';
import { DrawerWidth } from '../helper/constants';

const styles = {
    list: {
        width: DrawerWidth,
    },
    fullList: {
        width: 'auto',
    },
};

class AppDrawer extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { classes, open, onClose } = this.props
        return (
            <div className={classes.list}>
                <Drawer open={open} onClose={onClose}>
                    <List>
                        <ListItem button key={'Users'} component={NavLink} to={'/users'} exact onClick={onClose}>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary={'Users'} />
                        </ListItem>
                        <ListItem button key={'New User'} component={NavLink} to={'/user-form/new'} exact onClick={onClose}>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <ListItemText primary={'New User'} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button key={'User Groups'} component={NavLink} to={'/user-groups'} exact onClick={onClose}>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary={'User Groups'} />
                        </ListItem>
                        <ListItem button key={'New User Group'} component={NavLink} to={'/user-group-form/new'} exact onClick={onClose}>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <ListItemText primary={'New User Group'} />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        )
    }

}

AppDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppDrawer);

