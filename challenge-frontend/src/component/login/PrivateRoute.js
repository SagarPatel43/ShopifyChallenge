import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from "../../service/AuthenticationService";

class PrivateRoute extends Component {

    render() {
        if (AuthenticationService.isLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default PrivateRoute
