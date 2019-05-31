import React, { Component } from 'react';
import './App.scss';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Organization from './components/Organization';
import SingleOrg from './components/SingleOrg';

import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import { isVerified } from './store/actions/Action';
import { connect } from 'react-redux';


class App extends Component {

componentDidMount(){
  const{isAuth,token} = this.props;
  if(token && !isAuth){
    // console.log('is veriied Called');
    this.props.dispatch(isVerified());
  }
}

  render() {

    return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/users/register" component={Register} />
          <Route exact path="/users/login" component={Login} />
          <Route exact path="/users/org" component={Organization}/>
          <Route exact path="/users/singleorg/:id" component={SingleOrg}/>          
        </Switch>
      </div>
    </Router>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    token:state.token,
    isAuth:state.isAuth,
  }
}
export default connect(mapStateToProps)(App);
