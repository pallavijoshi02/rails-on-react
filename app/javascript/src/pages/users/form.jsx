import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    showLoader, pushError, pushSuccess,
} from '../../../redux/actions';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
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

class UserForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: 'Users Form',
            submitText: 'Update',
            validated: false,
            fields: {},
            errors: {}
        }
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
            const method = 'post'
            const url = `/users`
            var self = this;
            api.app({
                method, url, data: {
                    user: {
                        name: this.state.fields.name,
                        email: this.state.fields.email,
                        contact: this.state.fields.contact,
                        password: this.state.fields.password,
                    },
                }
            }).then((resp) => {
                this.props.pushSuccess(resp.success, { hideLoader: true })
                if (resp.status == 200) {
                    this.props.history.push('/');
                }

            }).catch((err) => {
                let errors = {};
                this.setState({
                    errors: errors
                });
                if (err.response.data.messages.name != undefined) {
                    errors.name = err.response.data.messages.name[0];
                }
                if (err.response.data.messages.email != undefined) {
                    errors.email = err.response.data.messages.email[0];
                }
                if (err.response.data.messages.contact != undefined) {
                    errors.contact = err.response.data.messages.contact[0];
                }
                if (err.response.data.messages.password != undefined) {
                    errors.password = err.response.data.messages.password[0];
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
        if (!fields["name"] || fields["name"].trim() == '') {
            formIsValid = false;
            errors["name"] = 'please enter name';
        }
        if (!fields["contact"] || fields["contact"].trim() == '') {
            formIsValid = false;
            errors["contact"] = 'please enter contact';
        }
        if (!fields["password"] || fields["password"].trim() == '') {
            formIsValid = false;
            errors["password"] = 'please enter password';
        }
        if (!fields["email"] || fields["email"].trim() == '') {
            formIsValid = false;
            errors["email"] = 'please enter email';
        }
        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    render() {
        const { classes, history } = this.props;
        const { validated } = this.state;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>

                    <Toolbar className='w-100'>
                        <IconButton onClick={history.goBack}>
                            <BackIcon /></IconButton>
                        <Typography component="h1" variant="h5">
                            {this.state.title}
                        </Typography>
                        <div className='flex-grow-1' />
                    </Toolbar>


                    <form className={classes.form} noValidate validated={validated.toString()} onSubmit={this.handleSubmit}>

                        <FormControl margin="normal" required fullWidth error={this.state.errors.name ? true : false}>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input id="name" name="name" autoComplete="name" autoFocus value={this.state.fields.name} onChange={this.handleInputChange} />
                            {this.state.errors.name && <FormHelperText>{this.state.errors.name}</FormHelperText>}
                        </FormControl>

                        <FormControl margin="normal" required fullWidth error={this.state.errors.email ? true : false}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" name="email" autoComplete="email" value={this.state.fields.email} onChange={this.handleInputChange} />
                            {this.state.errors.email && <FormHelperText>{this.state.errors.email}</FormHelperText>}
                        </FormControl>

                        <FormControl margin="normal" required fullWidth error={this.state.errors.contact ? true : false}>
                            <InputLabel htmlFor="contact">Contact</InputLabel>
                            <Input id="contact" name="contact" autoComplete="contact" value={this.state.fields.contact} onChange={this.handleInputChange} />
                            {this.state.errors.contact && <FormHelperText>{this.state.errors.contact}</FormHelperText>}
                        </FormControl>

                        <FormControl margin="normal" required fullWidth error={this.state.errors.password ? true : false}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.fields.password} onChange={this.handleInputChange} />
                            {this.state.errors.password && <FormHelperText>{this.state.errors.password}</FormHelperText>}
                        </FormControl>

                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {this.state.submitText}
                        </Button>
                    </form>
                </Paper>
            </main>
        )
    }
}

UserForm.propTypes = {
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
    withStyles(styles)(UserForm));
