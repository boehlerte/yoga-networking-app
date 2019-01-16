import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Axios from 'axios';
import './LoginForm.scss';

export default class LoginForms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isAuthenticated: false
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    // dynamically sets username and password to user's input
    handleChange(event) {
        const { target } = event;
        const { name, value } = target;
        this.setState({
            [name] : value,
        });
    }

    submitForm(event) {
        event.preventDefault();
        Axios.post('/api/login', {
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            console.log(res);
            this.setState({isAuthenticated: true});
            this.props.onLogin(this.state.isAuthenticated);
            
            // test that user can now access secure url
            localStorage.setItem('auth_token', res.data.token);
            var config = {
                headers: {'x-access-token': localStorage.getItem('auth_token')}
            };
            Axios.get('/api/secure', config)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        const { username, password, isAuthenticated } = this.state;
        if (isAuthenticated) {
            return <div>Success!</div>
        } else {
            return (
                <Form className="login-form" onSubmit={ (e) => this.submitForm(e) }>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input 
                            type="username" 
                            name="username" 
                            id="username" 
                            value={ username }
                            placeholder="Username"
                            onChange={ (e) => {
                                this.handleChange(e)
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={ password }
                            placeholder="Password"
                            onChange={ (e) => {
                                this.handleChange(e)
                            }}
                        />
                    </FormGroup>
                    <Button>Login</Button>
                </Form>
            );
        }
    }
}