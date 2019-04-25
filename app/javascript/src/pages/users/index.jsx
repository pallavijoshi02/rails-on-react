import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import api from '../../api/index';
import MUIDataTable from "mui-datatables";

const styles = theme => ({
    root: {
        width: '100%',
    },
});

const columns = ["Name", "Email", "Contact", "Updated at"];

const options = {
    filterType: 'checkbox',
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
                console.log(response);
                self.setState({
                    users: response.data.users.map((row) => ([
                        row.name || '',
                        row.email || '',
                        row.contact || '',
                        row.created_at
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

