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
      isLoggedIn: localStorage.getItem('user') != null ? true : false,
      user: JSON.parse(localStorage.getItem('user'))
    }
  }
  
  onLogin(user) {
    this.setState({ isLoggedIn: true, user: user });
  }

  onLogout() {
    this.setState({ isLoggedIn: false, user: null });
  }

  render() {
    const { isLoggedIn, user } = this.state;
      return (
        <div className="App">
          <nav className="App-navigation">
            <NavComponent 
              onLogin={this.onLogin} 
              onLogout={this.onLogout} 
              isLoggedIn={isLoggedIn}
              user={user}
            />
          </nav>
          <HashRouter>
            <Switch>
              <Route 
                exact path="/" 
                render={(props) => <HomePage {...props} isLoggedIn={isLoggedIn}/>} 
              />
              <Route 
                path="/profile/:username" 
                render={(props) => <ProfilePage {...props} isLoggedIn={isLoggedIn} />}
              />
              <Route component={HomePage}/>
            </Switch>
          </HashRouter>
        </div>
        
      );
    }
}

export default App;
