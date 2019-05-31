import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends React.Component {

  handleClick = (e) => {
    localStorage.removeItem('token');
    window.location.reload(); 
    <Redirect to="/"/>
  }


  render () {
    const { token } = this.props;
    console.log(this.props.token, 'checking token');
    if(token !== 'undefined' && token){
      return (
        <div>
          <ul className="main__nav">
            <li className="main__navlist--item1">
              <Link to="/" className="nav__links">Home</Link>
              <Link to="/users/org" className="nav__links">Create</Link>
              <button className="ui button" onClick={this.handleClick}>logout</button>
            </li>
            <li>
              {/* {this.props.userData} */}
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
          <li>
          <Link to="/" className="nav__links">Home</Link>
          </li>
        </ul>
      </div>
    )
    }
  }
};

const mapStateToProps = (state) => {
  return {
    token : state.token,
    userData: state.userData
  }
}

export default connect(mapStateToProps)(Nav);