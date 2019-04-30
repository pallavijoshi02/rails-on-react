import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import api from '../../api/index';
import MUIDataTable from 'mui-datatables';
import ViewIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CustomToolbar from '../../common/customToolbar';
import CustomToolbarSelect from '../../common/customToolbarSelect';

const styles = theme => ({
    root: {
        width: '100%',
    },
});

const COL_NAME = { name: 'Name', options: { sort: true, filter: true } }
const COL_EMAIL = { name: 'Email', options: { sort: true, filter: true } }
const COL_CONTACT = { name: 'Contact', options: { sort: true, filter: true } }
const COL_UAT = { name: 'Updated at', options: { sort: true, filter: true } }
const COL_ACTIONS = (view, edit) => ({
    name: 'Action', options: {
        sort: false, filter: false,
        customBodyRender: (data) => {
            const viewPath = `/user-view/${data.id}`
            const editPath = `/user-form/${data.id}`
            return (
                <React.Fragment>
                    {view && <IconButton component={Link} to={viewPath}><ViewIcon /></IconButton>}
                    {edit && <IconButton component={Link} to={editPath}><EditIcon /></IconButton>}
                </React.Fragment>
            );
        }
    }
});

const columns = [COL_NAME, COL_EMAIL, COL_CONTACT, COL_UAT, COL_ACTIONS(true, true)];

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

    addRecord() {
        this.props.history.push('/user-form/new');
    }

    deleteRecord(selectedRows) {
        console.log(this.state.users)
        console.log('delete call', selectedRows)
    }

    render() {
        const options = {
            filter: true,
            filterType: 'multiselect',
            selectableRows: true,
            responsive: 'stacked',
            rowsPerPage: 10,
            customToolbar: () => {
                return (
                    <CustomToolbar addRecord={() => { this.addRecord() }} />
                );
            },
            customToolbarSelect: selectedRows => (
                <CustomToolbarSelect deleteRecord={() => { this.deleteRecord(selectedRows) }} />
            )
        };

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

export default withRouter(connect()(withStyles(styles)(UserList)));

