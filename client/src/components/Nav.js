import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends React.Component {
  render () {
    if(this.props.token){
      return (
      <div>
        <ul className="main__nav">
          <li className="main__navlist--item1">
            <Link to="/users/org" className="nav__links">Create</Link>
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