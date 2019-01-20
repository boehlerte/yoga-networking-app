import React, { Component } from 'react';
import './ProfilePage.scss';
import Axios from 'axios';

export class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        if (localStorage.getItem('user') != null) {
            const username = JSON.parse(localStorage.getItem('user')).username;
            const auth_token = JSON.parse(localStorage.getItem('user')).auth_token;
            var config = {
                headers: {'Authorization': 'Bearer ' + auth_token}
            };
            Axios.get('/api/user/' + username, config)
            .then (res => {
                this.setState({ user: res})
            }) 
            .catch (error => {
                console.log(error);
            })
        }
    }

    render() {
        return (
            <div className="user-profile-container">
                { 
                    this.props.isLoggedIn && 
                    <div>
                        Profile Page
                        
                    </div> 
                }

                {/* logged out page */}
                { !this.props.isLoggedIn && <div>Please Login to View</div> }
            </div>
        );
    }
}