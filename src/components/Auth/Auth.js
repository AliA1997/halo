import React, { Component } from 'react';
import axios from 'axios';

export default class Auth extends Component {
    login() {
        const redirectURI = encodeURIComponent(`${window.location.origin}/auth/callback`);
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectURI}&response_type=code`;
    }
    render() {
        return (
            <div>
                <button onClick={this.login}>Login</button>
            </div>
        );
    }
}