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
            langMenuAnchorEl: null,
            userMenuAnchorEl: null,
        }        
    }

    changeLocale = (e) => {
        if (!e || !e.currentTarget)
            return this.toggleLangMenu()
        const lc = e.currentTarget.id
        if (!lc || lc === I18n.currentLocale())
            return this.toggleLangMenu()
        api.changeLocale(lc)
            .then(() => (this.toggleLangMenu()))
    }

    toggleLangMenu = (e) => {
        if (!!this.state.langMenuAnchorEl)
            this.setState({ langMenuAnchorEl: null })
        else
            this.setState({ langMenuAnchorEl: e.currentTarget })
    }

    toggleUserMenu = (e) => {
        if (!!this.state.userMenuAnchorEl)
            this.setState({ userMenuAnchorEl: null })
        else
            this.setState({ userMenuAnchorEl: e.currentTarget })
    }

    logout = () => {
        this.setState({ userMenuAnchorEl: null });
        api.logout();
    };

    render() {
        const { classes, openDrawer } = this.props
        const { userMenuAnchorEl, langMenuAnchorEl } = this.state;
        const open = Boolean(userMenuAnchorEl);
        const langOpen = Boolean(langMenuAnchorEl);
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
                        onClick={this.toggleLangMenu}
                    >
                        <LangIcon />
                    </IconButton>

                    <Menu
                        id="lang-menu"
                        anchorEl={langMenuAnchorEl}
                        open={langOpen}
                        onClose={this.toggleLangMenu}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: 200,
                            },
                        }}
                    >
                        <MenuItem id="en" onClick={this.changeLocale} selected={'en' === I18n.currentLocale()}><span className="flag-icon flag-icon-gb"></span>&nbsp; {I18n.t('locale_names.en')}</MenuItem>
                        <MenuItem id="fr" onClick={this.changeLocale} selected={'fr' === I18n.currentLocale()}><span className="flag-icon flag-icon-fr"></span>&nbsp; {I18n.t('locale_names.fr')}</MenuItem>
                    </Menu>


                    {/* account menu */}
                    <IconButton
                        aria-label="More"
                        aria-owns={open ? 'long-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.toggleUserMenu}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={userMenuAnchorEl}
                        open={open}
                        onClose={this.toggleUserMenu}
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

