import React, { Component } from 'react';
import './MemberCard.scss';
import { Button, Collapse } from 'reactstrap';
import Transition from 'react-transition-group/Transition';

export class MemberCard extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapsed: false,
            name: props.data.name,
            photo: props.data.photo,
            location: props.data.location,
            bio: props.data.bio
        }
    }

    toggle() {
        this.setState({collapsed: !this.state.collapsed });
    }

    render() {
        const duration = 500;
        const defaultStyle = {
            transition: `all ${duration}ms`,
            overflow: `hidden`,
            height: `0`,
            padding: `0`,
        }

        const transitionStyles = {
            entered: { height: `275px`},
            exited: { height: `0`}
        };

        var bioButtonText;
        if (!this.state.collapsed) {
            bioButtonText = 'View Bio';
        } else {
            bioButtonText = 'Hide Bio';
        }

        return (
            <div className="social-card__container card">
                <img className="social-card__profile-photo" src={require('../assets/'+this.state.photo)} alt="profile"/>
                <div className="card-body">
                    <h5 className="card-name">{this.state.name}</h5>
                    <p className="card-location">
                        <img src={require('../assets/location_pin.png')} alt="pin" className="thumbnail-sm"/>
                        {this.state.location}
                    </p>
                    <div className="card-bio">
                        <Button color="primary" onClick={this.toggle}>{bioButtonText}</Button>
                        <Transition in={this.state.collapsed} timeout={0}>
                            {(state) => (
                                <div style={{...defaultStyle, ...transitionStyles[state]}}>
                                    <Collapse isOpen={this.state.collapsed} className="collapse" id="showBio">
                                        <div style={{marginTop: '1em'}}>
                                            {this.state.bio}
                                        </div>
                                    </Collapse>
                                </div>
                            )}
                            
                        </Transition>
                    </div>
                </div>
                
            </div>
        );
    }
}
