import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../../api/index';
import MUIDataTable from 'mui-datatables';
import ViewIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CustomToolbar from '../../common/customToolbar';
import CustomToolbarSelect from '../../common/customToolbarSelect';
import moment from 'moment';


const COL_NAME = { name: I18n.t('user_group.index.name'), options: { sort: true, filter: true } }
const COL_UAT = { name: I18n.t('user_group.index.updated_at'), options: { sort: true, filter: true } }
const COL_ACTIONS = (view, edit) => ({
    name: 'Action', options: {
        sort: false, filter: false,
        customBodyRender: (data) => {
            const viewPath = `/user/user-group-view/${data.id}`
            const editPath = `/user/user-group-form/${data.id}`
            return (
                <React.Fragment>
                    {view && <IconButton component={Link} to={viewPath}><ViewIcon /></IconButton>}
                    {edit && <IconButton component={Link} to={editPath}><EditIcon /></IconButton>}
                </React.Fragment>
            );
        }
    }
});

const columns = [COL_NAME, COL_UAT, COL_ACTIONS(true, true)];

class UserGroupList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
        this.getData();
    }

    getData() {
        self = this
        api.app.get('/user_groups')
            .then(function (response) {
                // handle success                
                self.setState({
                    results: response.data.results
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

    deleteData(id) {
        self = this
        api.app.delete('/user_groups/' + id)
            .then(function (response) {
                // handle success     
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    bindData() {
        return this.state.results.map((row) => ([
            row.name || '',
            moment(row.created_at).format('D MMM YYYY'),
            { id: row.id },
        ]));
    }

    addRecord() {
        this.props.history.push('/user/user-group-form/new');
    }
    reloadRecord() {
        this.getData();
    }

    deleteRecord(selectedRows) {
        if (selectedRows.data.length) {
            selectedRows.data.map((data) => {
                this.deleteData(this.state.results[data.dataIndex].id);
            });
            this.props.history.push('/user-groups');
        }
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
                    <CustomToolbar addRecord={() => { this.addRecord() }} reloadRecord={() => { this.reloadRecord() }} />
                );
            },
            customToolbarSelect: selectedRows => (
                <CustomToolbarSelect deleteRecord={() => { this.deleteRecord(selectedRows) }} />
            )
        };

        return (
            <MUIDataTable
                title={I18n.t('user_group.index.heading')}
                data={this.bindData()}
                columns={columns}
                options={options}
            />
        )
    }
}

export default withRouter(connect()(UserGroupList));

