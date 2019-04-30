import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarSelectStyles = {
    iconButton: {
        marginRight: "24px",
        top: "50%",
        display: "inline-block",
        position: "relative",
        transform: "translateY(-50%)"
    },
    deleteIcon: {
        color: "#000"
    }
};

class CustomToolbarSelect extends React.Component {
    render() {
        const { classes, deleteRecord } = this.props;

        return (
            <React.Fragment>
                <Tooltip title={"delete"}>
                    <IconButton className={classes.iconButton} onClick={deleteRecord}>
                        <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles)(CustomToolbarSelect);
