import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends React.Component {

  handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
  }


  render () {
    if(this.props.token){
      return (
      <div>
        <ul className="main__nav">
          <li className="main__navlist--item1">
            <Link to="/" className="nav__links">Home</Link>
            <Link to="/users/org" className="nav__links">Create</Link>
            <button className="ui button" onClick={this.handleClick}>logout</button>
          </li>
        </ul>
      </div>
    )
  }else {
    return (
      <div>
        <ul className="main__nav">
          <li className="main__navlist--item1">
            <Link to="/users/login" className="nav__links">Login</Link>
          </li>
          <li className="main__navlist--item2">
            <Link to="/users/register" className="nav__links">Register</Link>
          </li>
        </ul>
      </div>
    )
    }
  }
};

const mapStateToProps = (state) => {
  return {
    token : state.token
  }
}

export default connect(mapStateToProps)(Nav);