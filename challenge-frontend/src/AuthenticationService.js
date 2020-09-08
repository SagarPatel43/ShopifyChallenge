import axios from 'axios';

const USERNAME = "username"
const IS_ADMIN = "isAdmin"

class AuthenticationService {

    login(username, password) {
        return axios.get('/login/' + username,
            {headers: {authorization: this.getBasicAuthToken(username, password)}});
    }

    getBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    loginSuccess(username, isAdmin) {
        sessionStorage.setItem(USERNAME, username);
        sessionStorage.setItem(IS_ADMIN, isAdmin);
    }

    getLoggedInUser() {
        let user = sessionStorage.getItem(USERNAME)
        if (user === null) {
            return '';
        }
        return user;
    }

    logout() {
        sessionStorage.removeItem(USERNAME);
        sessionStorage.removeItem(IS_ADMIN);

        return axios.post('/logout')
    }

    isLoggedIn() {
        let user = sessionStorage.getItem(USERNAME)
        return user !== null;
    }

    isAdmin() {
        let isAdmin = sessionStorage.getItem(IS_ADMIN);
        return (isAdmin !== null && isAdmin === "true");
    }

}

export default new AuthenticationService()
