import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    showLoader, pushError, pushSuccess,
} from '../../../redux/actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import api from '../../api/index';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

const INITIAL_FIELDS = {
    username: '',
    password: ''
}

const INITIAL_STATE = {
    title: 'Sign In',
    submitText: 'Sign In',
    validated: false,
    fields: INITIAL_FIELDS,
    errors: INITIAL_FIELDS,
    user: []
}

class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        let fields = this.state.fields;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        fields[name] = value;
        this.setState({
            fields,
            errors: []
        });
    }

    handleSubmit(event) {
        const form = event.target;
        event.preventDefault();
        event.stopPropagation();

        if (this.validateForm()) {
            const method = 'post';
            const formData = new FormData();
            formData.append("username", this.state.fields.username)
            formData.append("password", this.state.fields.password)

            const url = `/authenticate`

            var self = this;
            api.login({
                method, url, data: formData
            }).then((resp) => {
                this.props.pushSuccess(resp.data.success, { hideLoader: true })
                if (resp.status == 200) {
                    sessionStorage.setItem('access_token', resp.data.access_token);
                    this.props.history.push('/users');
                }

            }).catch((err) => {
                let errors = {};
                this.setState({
                    errors: errors
                });
                if (err.response.data.errors.username != undefined) {
                    errors.username = err.response.data.errors.username[0];
                }
                if (err.response.data.errors.password != undefined) {
                    errors.password = err.response.data.errors.password[0];
                }
                this.setState({
                    errors: errors,
                });
                this.props.pushError(api.parseError(err), { hideLoader: true })
            })
        } else {
            this.setState({ validated: true });
        }
    }

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        this.setState({
            errors: errors
        });
        if (!fields["username"] || fields["username"].trim() == '') {
            formIsValid = false;
            errors["username"] = 'please enter username';
        }
        if (!fields["password"] || fields["password"].trim() == '') {
            formIsValid = false;
            errors["password"] = 'please enter password';
        }
        this.setState({
            errors: errors
        });
        return formIsValid;
    }



    render() {
        const { classes } = this.props;
        const { validated } = this.state;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {this.state.title}
                    </Typography>
                    <form className={classes.form} noValidate validated={validated.toString()} onSubmit={this.handleSubmit}>

                        <FormControl margin="normal" required fullWidth error={this.state.errors.username ? true : false}>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" name="username" autoComplete="username" autoFocus value={this.state.fields.username} onChange={this.handleInputChange} />
                            {this.state.errors.username && <FormHelperText>{this.state.errors.username}</FormHelperText>}
                        </FormControl>

                        <FormControl margin="normal" required fullWidth error={this.state.errors.password ? true : false}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.fields.password} onChange={this.handleInputChange} />
                            {this.state.errors.password && <FormHelperText>{this.state.errors.password}</FormHelperText>}
                        </FormControl>

                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}

                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {this.state.submitText}
                        </Button>
                    </form>
                </Paper>
            </main>
        )
    }
}



LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showLoader: () => dispatch(showLoader()),
        pushSuccess: (msg, args) => dispatch(pushSuccess(msg, args)),
        pushError: (msg, args) => dispatch(pushError(msg, args))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(LoginForm));