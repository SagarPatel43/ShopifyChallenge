import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";
import {Fab, fade, Toolbar, useScrollTrigger} from "@material-ui/core";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from "@material-ui/core/Zoom";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Link from "@material-ui/core/Link";
import AuthenticationService from "../../service/AuthenticationService";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 10
    },
    fabRoot: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 2
    },
    appBarRoot: {
        background: 'radial-gradient(circle, rgba(35,35,117,1) 0%, rgba(40,63,175,1) 0%, rgba(25,23,84,1) 90%)'
    },
    searchBar: {
        position: 'absolute',
        borderRadius: 6,
        backgroundColor: fade('rgb(255, 255, 255)', 0.15),
        '&:hover': {
            backgroundColor: fade('rgb(255, 255, 255)', 0.25),
        },
        left: 'calc(50% - 250px)',
        width: 500
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%',
    },
    uploadButton: {
        backgroundColor: fade('rgb(255, 255, 255)', 0.15),
        '&:hover': {
            backgroundColor: fade('rgb(255, 255, 255)', 0.25),
        }
    },
    uploadButtonLabel: {
        textTransform: 'capitalize'
    },
    header: {
        fontFamily: 'Quicksand',
        fontWeight: 600
    },
    uploadRoot: {
        marginLeft: 'auto',
        marginRight: 10,
        marginBottom: 20
    }

}));

/*
Component used for adding elevation to AppBar when user scrolls from top of page
 */
function ElevationScroll(props) {
    const {children} = props;

    const elevateAppBarTrigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: elevateAppBarTrigger ? 4 : 0
    })
}

/*
Component used for adding "scroll to top" fab when user scrolls down
 */
function ScrollToTop() {
    const classes = useStyles();

    // Go back to top anchor when fab is clicked
    const handleClick = (event) => {
        let anchor = (event.target.ownerDocument).querySelector('#top-anchor');
        if (anchor) {
            anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }

    const scrollToTopTrigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100
    })

    return (
        <Zoom in={scrollToTopTrigger}>
            <div className={classes.fabRoot} onClick={handleClick}>
                <Fab color="primary" size="small">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </div>
        </Zoom>
    )
}

/*
Holds top header with search bar and upload button
 */
export default function TitleBar(props) {
    const classes = useStyles();
    const history = useHistory();

    const logout = () => {
        AuthenticationService.logout().then(r => history.push('/login'));
    }

    return (
        <div className={classes.root}>
            <ElevationScroll {...props}>
                <AppBar className={classes.appBarRoot}>
                    <Toolbar>
                        <Typography className={classes.header} variant={'h4'}>
                            <Link color='inherit' href='/'>
                                <u>Image Repository</u>
                            </Link>
                        </Typography>
                        {!props.login &&
                        <div className={classes.searchBar}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search for images"
                                className={classes.inputInput}
                                onChange={(e) => props.onSearch(e)}
                                style={{color: 'white'}}
                            />
                        </div>}
                        {!props.login &&
                        <div className={classes.uploadRoot}>
                            <Typography align='left' display='block'  variant='subtitle2' gutterBottom={true} style={{marginTop: 5}}>Welcome {AuthenticationService.getLoggedInUser()}</Typography>
                            <input
                                type="file"
                                multiple
                                id="upload-button"
                                onChange={props.onUpload}
                                style={{display: 'none'}}
                            />
                            <label htmlFor="upload-button">
                                <Button classes={{root: classes.uploadButton, label: classes.uploadButtonLabel}}
                                        variant="contained" color="primary"
                                        component="span" startIcon={<CloudUploadIcon/>}>
                                    Upload Images
                                </Button>
                            </label>
                            <Button style={{color: 'white', left: 15, textTransform: 'none'}} onClick={logout}>Logout</Button>
                        </div>}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar id="top-anchor"/>
            <ScrollToTop/>
        </div>
    )
}
