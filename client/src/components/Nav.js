import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends React.Component {

  handleClick = (e) => {
    localStorage.removeItem('token');
    window.location.reload(); 
    <Redirect to="/" />
  }


  render () {
    const { token } = this.props;
    // console.log(this.props.token, 'checking token');
    if(token !== 'undefined' && token){
      return (
        <div>
          <ul className="navbar">
            <li className='navbar-start'>
              <p className='logo-name'>altify</p>
            </li>
            <li>
              {/* {this.props.userData} */}
            </li>
            <button className="button navbar-end log-out-button" onClick={this.handleClick}>logout</button>
          </ul>
        </div>
    )
  } else {
    return (
      <div>
        <ul className="navbar is-danger">
          <li className="navbar-item">
            {/* <Link to="/users/login" className="button">Login</Link>
            <Link to="/users/register" className="button bg-primary">Sign up</Link> */}
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