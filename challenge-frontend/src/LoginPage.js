import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import TitleBar from "./component/TitleBar";
import AuthenticationService from "./AuthenticationService";

const styles = {
    root: {
        width: 600,
        height: 400,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto'
    },
    textBox: {
        display: 'block',
        width: 200,
        margin: 'auto',
        marginBottom: 10,
        backgroundColor: 'white'
    },
    loginButton: {
        display: 'block',
        width: 200,
        margin: 'auto',
    },
    header: {
        color: 'white',
        marginBottom: 50,
        textAlign: 'center'
    }
}

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            usernameError: false,
            passwordError: false
        }

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (AuthenticationService.isLoggedIn()) {
            this.props.history.push('/');
        }
    }

    handleUsername(event) {
        this.setState({username: event.target.value, usernameError: false})
    }

    handlePassword(event) {
        this.setState({password: event.target.value, passwordError: false})
    }

    handleSubmit(event) {
        event.preventDefault();

        AuthenticationService.login(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.loginSuccess(response.data.username, response.data.admin);
                this.props.history.push('/');
            }).catch((e) => {
                this.setState({usernameError: true, passwordError: true})
            // Failed
            console.log(e)
        })

    }

    render() {
        const {classes} = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <TitleBar login={true}/>
                <div className={classes.root}>
                    <Typography variant='h1' className={classes.header}>Login Page</Typography>
                    <TextField
                        id="username-input"
                        error={this.state.usernameError}
                        className={classes.textBox}
                        classes={{root: classes.textBox}}
                        label="Username"
                        variant="filled"
                        onChange={this.handleUsername}
                    />
                    <TextField
                        id="password-input"
                        error={this.state.passwordError}
                        className={classes.textBox}
                        label="Password"
                        type="password"
                        variant="filled"
                        onChange={this.handlePassword}
                    />

                    <Button className={classes.loginButton} variant="contained" type="submit">Log in</Button>
                </div>
            </form>
        )
    }
}

export default withStyles(styles)(LoginPage)
