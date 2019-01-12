import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.scss';
import { MemberBoard } from './components/MemberBoard';
import Axios from 'axios';
import { NavComponent } from './components/NavComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        members: [],
        isLoading: true
    };
  }

  componentDidMount() {
    Axios.get('http://localhost:8080/src/api/memberData.json')
    .then(res => {
        console.log(res);
        this.setState({members: res.data.members, isLoading: false});
    });
  }

  render() {
    const { members, isLoading } = this.state;
    if (isLoading) {
      return <div>App is loading...</div>
    } else {
      return (
        <div className="App">
          <nav className="App-navigation">
            <NavComponent />
          </nav>
          <header className="App-header">
            <h4>Yogi Network</h4>
          </header>
          <div className="Members">
            <MemberBoard members={members}/>
          </div>
        </div>
      );
    }
  }
}

export default App;
