import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import api from '../../api/index';
import MUIDataTable from 'mui-datatables';
import ViewIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        width: '100%',
    },
});

const COL_NAME = { name: 'Name', options: { sort: true, filter: true } }
const COL_EMAIL = { name: 'Email', options: { sort: true, filter: true } }
const COL_CONTACT = { name: 'Contact', options: { sort: true, filter: true } }
const COL_UAT = { name: 'Updated at', options: { sort: true, filter: true } }
const COL_ACTION = {
    name: 'Action', options: {
        sort: false, filter: false,
        customBodyRender: (data) => {
            const viewPath = `/user-view/${data.id}`
            const editPath = `/user-form/${data.id}`
            return (
                <React.Fragment>
                    <IconButton component={Link} to={viewPath}><ViewIcon /></IconButton>
                    <IconButton component={Link} to={editPath}><EditIcon /></IconButton>
                </React.Fragment>
            );
        }
    }
}

const columns = [COL_NAME, COL_EMAIL, COL_CONTACT, COL_UAT, COL_ACTION];

const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    filterType: 'multiselect'
};

class UserList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: 'Users List',
            users: []
        }
        this.getData();
    }

    getData() {
        self = this
        api.app.get('/users')
            .then(function (response) {
                // handle success                
                self.setState({
                    users: response.data.users.map((row) => ([
                        row.name || '',
                        row.email || '',
                        row.contact || '',
                        row.created_at,
                        { id: row.id },
                    ]))
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <MUIDataTable
                    title={this.state.title}
                    data={this.state.users}
                    columns={columns}
                    options={options}
                />
            </div>
        )
    }
}

UserList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);

