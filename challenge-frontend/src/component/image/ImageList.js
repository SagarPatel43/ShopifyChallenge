import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import {fade, GridList} from "@material-ui/core";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AuthenticationService from "../../service/AuthenticationService";

const styles = {
    imageRoot: {
        marginTop: 30,
        marginLeft: 80
    },
    tileRoot: {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)',
        '&:hover': {
            boxShadow: '0 4px 8px 4px rgba(0, 0, 0, 0.2), 0 6px 20px 4px rgba(0, 0, 0, 0.2)'
        },
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3
    },
    border: {
        borderRadius: 3
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    },
    image: {
        backgroundColor: 'rgb(71, 74, 81)'
    },
    overlay: {
        backgroundColor: fade('rgb(255, 255, 255)', 0),
        '&:hover': {
            backgroundColor: fade('rgb(255, 255, 255)', 0.05),
            cursor: 'pointer'
        },
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    }
}

class ImageList extends Component {

    renderDelete(index, imageId, uploader) {
        if (AuthenticationService.isAdmin() || uploader === AuthenticationService.getLoggedInUser()) {
            return (
                <IconButton style={{color: 'white'}}
                            onClick={() => this.props.onClickDelete(imageId)}>
                    <DeleteIcon/>
                </IconButton>
            )
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.imageRoot}>
                <GridList cellHeight={220} cols={8}>
                    {this.props.images.map((image, index) =>
                        <GridListTile classes={{root: classes.tileRoot, tile: classes.border}} key={image.id}
                                      cols={1} style={{padding: 0}}>
                            <img className={classes.image} src={image.url} alt={"Could not load"}/>
                            <a href={image.url}>
                                <div className={classes.overlay}/>
                            </a>

                            <GridListTileBar
                                className={classes.titleBar}
                                title={image.name}
                                subtitle={<span>By {image.uploader}</span>}
                                actionIcon={this.renderDelete(index, image.id, image.uploader)}
                            />
                        </GridListTile>
                    )}
                </GridList>
            </div>
        )
    }
}

export default withStyles(styles)(ImageList);
