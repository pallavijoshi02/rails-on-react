import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { DrawerWidth } from '../helper/constants';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import api from '../api/index';


const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        marginLeft: DrawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${DrawerWidth}px)`,
        },
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});


const ITEM_HEIGHT = 48;

class AppTopBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {            
            title: I18n.t('title'),
            anchorEl: null,
        }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    logout = () => {
        this.setState({ anchorEl: null });
        api.logout();
    };

    render() {
        const { classes, openDrawer } = this.props
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} onClick={openDrawer} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {this.state.title}
                    </Typography>

                    <IconButton
                        aria-label="More"
                        aria-owns={open ? 'long-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>

                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: 200,
                            },
                        }}
                    >
                        <MenuItem onClick={this.logout}>{I18n.t('account.logout')}</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        )
    }

}

AppTopBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppTopBar);

