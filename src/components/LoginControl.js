import LoginForm from "./LoginForm";
import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class LoginControl extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleLogin(isSuccess, user) {
        this.props.onLogin(isSuccess, user);
    }

    handleCancel() {
        this.props.onLogout(false);
    }

    handleLogout() {
       this.props.onLogout(true);
    }

    render() {
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <div>Are you sure you want to logout?</div>
                    <div style={{textAlign: 'center', marginTop: '1em'}}>
                        <Button color="secondary" onClick={this.handleCancel} style={{marginRight: '1em'}}>Cancel</Button>
                        <Button color="primary" onClick={this.handleLogout}>Logout</Button>
                    </div>
                </div>
            );
        } else {
            return (
                <LoginForm onLogin={this.handleLogin}/>  
            );
        }
    }
}