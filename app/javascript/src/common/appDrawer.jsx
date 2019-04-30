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
                        <ListItem button key={'User List'} component={NavLink} to={'/'} exact onClick={onClose}>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary={'User List'} />
                        </ListItem>
                        <ListItem button key={'User Form'} component={NavLink} to={'/user-form/new'} exact onClick={onClose}>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <ListItemText primary={'User Form'} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
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

