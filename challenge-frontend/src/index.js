import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import LoginPage from "./component/login/LoginPage";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import PrivateRoute from "./component/login/PrivateRoute";

const NotFound = () => <h1 style={{color: 'white'}}>404 - Not found</h1>

const routing = (
    <Router>
        <Switch>
            <Route exact path="/login" component={LoginPage}/>
            <PrivateRoute exact path="/" component={App}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
)

ReactDOM.render(
    routing,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
