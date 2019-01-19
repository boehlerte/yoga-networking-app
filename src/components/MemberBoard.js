import React, { Component } from 'react';
import './MemberBoard.scss';
import { MemberCard } from './MemberCard';
import Axios from 'axios';

export class MemberBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: []
        };
    }

    componentDidMount() {
        Axios.get('/api/members')
        .then(res => {
            console.log(res);
            this.setState({members: res.data.members});
        });
      }

    render() {
        const members = this.state.members;
        var membersList = members.map((member) => {
            return <MemberCard key={member.name} data={member}></MemberCard>
        });
        return (
            <div className="member-board__container card-columns container-fluid">
                {membersList}
            </div>
        );
    }
}