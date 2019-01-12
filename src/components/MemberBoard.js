import React, { Component } from 'react';
import './MemberBoard.scss';
import { MemberCard } from './MemberCard';

export class MemberBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: this.props.members,
        };
    }

    render() {
        const members = this.state.members;
        var membersList = members.map((member) => {
            return <MemberCard key={member.name} data={member}></MemberCard>
        });
        return (
            <div className="member-board__container card-columns container">
                {membersList}
            </div>
        );
    }
}