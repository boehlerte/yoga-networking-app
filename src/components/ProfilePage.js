import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './ProfilePage.scss';
import Axios from 'axios';

export class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
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
                this.setState({ user: res.data })
            }) 
            .catch (error => {
                console.log(error);
            })
        }
    }

    render() {
        const { user } = this.state;
        return (
            <div>
                { 
                    this.props.isLoggedIn && user != null &&
                    <div className="profile container-fluid">
                        <div className="profile__content">
                            <div className="profile__avatar">
                                <img className="profile__avatar-img" src={require('../assets/'+user.photo)} alt="avatar"/>
                            </div>
                            
                            <div className="profile__intro">
                                <h5 className="profile__intro-username">{user.username}</h5>
                                <p className="profile__intro-mantra">{user.mantra}</p>
                            </div>

                            <div className="profile__fullBio">
                                <h5 className="profile__fullBio-name">{user.name}</h5>
                                <h6 className="profile__fullBio-location">
                                    <img src={require('../assets/location_pin.png')} alt="pin" className="thumbnail-sm"/>
                                    {user.location}
                                </h6>
                                <p className="profile__fullBio-bio">{user.bio}</p>
                            </div>
                        </div>
                    </div>
                }

                {/* logged out page */}
                { !this.props.isLoggedIn && <Redirect to="/" />}
            </div>
        );
    }
}