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

class AppTopBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: 'React on Rails',
        }
    }

    render() {
        const { classes, openDrawer } = this.props
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} onClick={openDrawer} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {this.state.title}
                    </Typography>
                    
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        )
    }

}

AppTopBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppTopBar);

