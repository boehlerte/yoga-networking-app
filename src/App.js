import React, { Component } from 'react';
import './App.scss';
import { NavComponent } from './components/NavComponent';
import { Route, Switch, HashRouter} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { ProfilePage } from './components/ProfilePage';

class App extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);

    this.state = {
      isLoggedIn: localStorage.getItem('auth_token') != null ? true : false
    }
  }
  
  onLogin() {
    this.setState({ isLoggedIn: true });
  }

  onLogout() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const { isLoggedIn } = this.state;
      return (
        <div className="App">
          <nav className="App-navigation">
            <NavComponent onLogin={this.onLogin} onLogout={this.onLogout} isLoggedIn={this.state.isLoggedIn}/>
          </nav>
          <HashRouter>
            <Switch>
              <Route 
                exact path="/" 
                render={(props) => <HomePage {...props} isLoggedIn={isLoggedIn}/>} 
              />
              <Route 
                path="/profile" 
                render={(props) => <ProfilePage {...props} isLoggedIn={isLoggedIn} />}
              />
            </Switch>
          </HashRouter>
        </div>
        
      );
    }
}

export default App;
