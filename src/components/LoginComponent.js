import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './LoginComponent.scss';

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange(event) {
        const { target } = event;
        const { name, value } = target;
        this.setState({
            [name] : value,
        });
    }

    submitForm(event) {
        event.preventDefault();
        console.log(`Username: ${this.state.username }`);
    }

    render() {
        const { username, password } = this.state;
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