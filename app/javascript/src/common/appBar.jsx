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
import LangIcon from '@material-ui/icons/Language';

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
            anchorEl: null,
            anchorLangEl: null,
        }

        console.log(I18n.availableLocales)
    }

    handleUserMenuClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleUserMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLangMenuClick = event => {
        this.setState({ anchorLangEl: event.currentTarget });
    };

    handleLangMenuClose = () => {
        this.setState({ anchorLangEl: null });
    };

    logout = () => {
        this.setState({ anchorEl: null });
        api.logout();
    };

    render() {
        const { classes, openDrawer } = this.props
        const { anchorEl, anchorLangEl } = this.state;
        const open = Boolean(anchorEl);
        const langOpen = Boolean(anchorLangEl);
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} onClick={openDrawer} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {I18n.t('appbar.heading')}
                    </Typography>

                    

                    {/* lang menu */}
                    <IconButton
                        aria-label="More"
                        aria-owns={langOpen ? 'lang-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleLangMenuClick}
                    >
                        <LangIcon />
                    </IconButton>

                    <Menu
                        id="lang-menu"
                        anchorEl={anchorLangEl}
                        open={langOpen}
                        onClose={this.handleLangMenuClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: 200,
                            },
                        }}
                    >
                        <MenuItem><span className="flag-icon flag-icon-gb"></span>&nbsp; English</MenuItem>
                        <MenuItem><span className="flag-icon flag-icon-fr"></span>&nbsp; French</MenuItem>
                    </Menu>


                    {/* account menu */}
                    <IconButton
                        aria-label="More"
                        aria-owns={open ? 'long-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleUserMenuClick}
                    >
                        <MoreVertIcon />
                    </IconButton>

                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleUserMenuClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: 200,
                            },
                        }}
                    >
                        <MenuItem onClick={this.logout}>{I18n.t('appbar.logout')}</MenuItem>
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

