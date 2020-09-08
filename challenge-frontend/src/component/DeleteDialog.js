import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    whiteText: {
        color: 'white'
    },
    background: {
        backgroundColor: 'rgb(71, 74, 81)'
    }
}


class DeleteDialog extends Component {

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.onClose} PaperProps={{
                    style: {
                        backgroundColor: 'rgb(71, 74, 81)'
                    }
                }}>
                    <DialogTitle className={classes.whiteText}>{"Delete Image"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText className={classes.whiteText}>
                            Are you sure you want to delete this image?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onDelete} className={classes.whiteText}>
                            Yes
                        </Button>
                        <Button onClick={this.props.onClose} className={classes.whiteText}>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(DeleteDialog);
