import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import UserIcon from '@material-ui/icons/SupervisedUserCircle';
import UserGroupIcon from '@material-ui/icons/VerifiedUser';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink } from 'react-router-dom';
import { DrawerWidth } from '../helper/constants';

const styles = theme => ({
    drawer: {
        width: DrawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: DrawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
});


const Menu = (props) => {
    const { classes } = props
    return (
        <div className='d-flex flex-column min-vh-100'>
            <List>
                <ListItem button key={I18n.t('menu.dashboard')} component={NavLink} to={'/dashboard'} exact>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary={I18n.t('menu.dashboard')} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key={I18n.t('menu.user_groups')} component={NavLink} to={'/user-groups'} exact>
                    <ListItemIcon><UserGroupIcon /></ListItemIcon>
                    <ListItemText primary={I18n.t('menu.user_groups')} />
                </ListItem>
                <ListItem button key={I18n.t('menu.users')} component={NavLink} to={'/users'} exact>
                    <ListItemIcon><UserIcon /></ListItemIcon>
                    <ListItemText primary={I18n.t('menu.users')} />
                </ListItem>
            </List>
        </div>
    )
}

class AppDrawer extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { classes, theme, open, onClose } = this.props
        const menu = <Menu classes={classes} />
        return (
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                onClose={onClose}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >

                <div className={classes.drawerHeader}>
                    <IconButton onClick={onClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />

               {menu}
            </Drawer>
        )
    }

}

AppDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppDrawer);

