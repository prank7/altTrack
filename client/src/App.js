import React, { Component } from 'react';
import './App.scss';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

import Organization from './components/Organization';

class App extends Component {
  render() {
    return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/users/register" component={Register} />
          <Route exact path="/users/login" component={Login} />
          <Route exact path="/users/org" component={Organization}/>
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
