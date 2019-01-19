import React, { Component } from 'react';
import { MemberBoard } from './MemberBoard';

export class HomePage extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <h4>Yogi Network</h4>
                </header>

                { this.props.isLoggedIn && <div className="Members">
                    <MemberBoard />
                </div>}
          </div>
        );
    }
}