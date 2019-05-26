import React, { Component } from 'react';
import './App.scss';
import Login from './components/Login';
import Register from './components/Register';
import Org from './components/Org';
import {
  BrowserRouter as Router,
  Route, Switch,withRouter
} from 'react-router-dom';
import Nav from './components/Nav';

class App extends Component {
  constructor() {
    super();

    this.state = {
      token: localStorage.getItem('AltTrack') || null
    }
  }
  
  getToken= (token) =>{
    console.log(token, "token in app.js")
    this.setState({token},()=>{
      this.props.history.push('/users/org');
    })
  }

  render() {
    return (

      <div className="App">
        <div className="heading__background--1">
          <h1 className="heading__homepage--1">altify</h1>
          <Nav/>
        </div>
        <div className="heading__background--2">
          <h4 className="heading__homepage--2">
          Keep track of your daily 
          <span className="pencil">&#9998;</span>
          <span className="update--text">Update</span>
          </h4>
        </div>
        <Switch>
          <Route exact path="/users/register" component={Register} />
          <Route exact path="/users/login" render={routeProps=> <Login {...routeProps} getToken={this.getToken}/>} />
          <Route exact path="/users/org" component={Org} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
