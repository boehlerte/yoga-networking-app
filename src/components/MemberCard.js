import React, { Component } from 'react';
import './MemberCard.scss';
import ReactCardFlip from 'react-card-flip';
import { Button } from 'reactstrap';

export class MemberCard extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isFlipped: false,
            name: props.data.name,
            photo: props.data.photo,
            location: props.data.location,
            bio: props.data.bio
        }
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    render() {
        return (
            <div className="social-card__container card">
                <ReactCardFlip isFlipped={this.state.isFlipped}>
                <div key="front" className="member-card__front">
                    <img className="social-card__profile-photo" src={require('../assets/'+this.state.photo)} alt="profile"/>
                    <div className="card-body">
                        <h5 className="card-name">{this.state.name}</h5>
                        <p className="card-location">
                            <img src={require('../assets/location_pin.png')} alt="pin" className="thumbnail-sm"/>
                            {this.state.location}
                        </p>
                        <Button onClick={this.handleClick}>See Bio</Button>
                    </div>
                </div>
                
                <div key="back" className="member-card__back">
                    <div className="card-body">
                        <p>{this.state.bio}</p>
                    </div>
                    <Button onClick={this.handleClick}>Go Back</Button>
                </div>
                </ReactCardFlip>
            </div>
        );
    }
}
