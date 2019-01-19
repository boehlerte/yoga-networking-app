import React, { Component } from 'react';
import './ProfilePage.scss';

export class ProfilePage extends Component {
    render() {
        return (
            <div className="user-profile-container">
                { this.props.isLoggedIn && <div>Profile Page</div> }
                { !this.props.isLoggedIn && <div>Please Login to View</div> }
            </div>
        );
    }
}