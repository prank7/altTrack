import React, { Component } from 'react';
import './App.scss';
import Login from './Login';
import Register from './Register';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/users/register" component={Register} />
          <Route exact path="/users/login" component={Login} />

        </Switch>
      </Router>
    );
  }
}

export default App;
