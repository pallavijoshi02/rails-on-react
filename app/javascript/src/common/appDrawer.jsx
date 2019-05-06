import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { DrawerWidth } from '../helper/constants';
import MenuNode from './menuNode';
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
    const { classes, theme, onClose } = props
    return (
        <React.Fragment>
            <div className={classes.drawerHeader}>
                <IconButton onClick={onClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />

            <div className='d-flex flex-column min-vh-100'>
                <List disablePadding component='nav' className='drawer flex-grow-1'>
                    <MenuNode showRoot role='dashboard' />
                    <MenuNode showRoot role='user' />
                </List>
            </div>
        </React.Fragment>
    )
}

class AppDrawer extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { classes, theme, open, onClose } = this.props
        const menu = <Menu classes={classes} theme={theme} onClose={onClose} />
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

