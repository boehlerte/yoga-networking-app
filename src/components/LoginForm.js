import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import Axios from 'axios';
import './LoginForm.scss';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isAuthenticated: false,
            showErrorMessage: false
        };
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
        event.preventDefault()
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
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('auth_token')}
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
            this.setState({showErrorMessage: true})
        })
    } 

    render() {
        const { username, password, showErrorMessage } = this.state;
        return (
            <div className="login-container">
                <Form className="login-form" onSubmit={ (e) => this.submitForm(e) }>
                    { showErrorMessage && 
                        <Alert color="warning">
                            Invalid username or password. If you do not have an account, register below. 
                        </Alert>
                    }
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
                    <div className="login-form__submit">
                        <Button color="primary">Login</Button>
                    </div>
                </Form>

                <div className="login-form__register">
                <Button color="link">Register</Button>
                </div>
            </div> 
        );
    }
}