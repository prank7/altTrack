import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends React.Component {

  handleClick = (e) => {
    localStorage.clear();
    window.location.reload(); 
    <Redirect to="/" />
  }


  render () {
    const { token } = this.props;
    const { username } = this.props;
    // console.log(this.props.token, 'checking token');
    if(token !== 'undefined' && token){
      return (
        <div>
          <ul className="navbar">
            <li className='navbar-start'>
              <Link to="/" ><p className='logo-name'>altify</p></Link>
            </li>
            <li className='navbar-end'>
              <Link to="/posts" ><p className='nav-username nav-posts'>Posts</p></Link>
              <p className='nav-username'>Hello! {username}</p>
              <button className="button log-out-button" onClick={this.handleClick}>logout</button>
            </li>
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
    username: state.name,
  }
}

export default connect(mapStateToProps)(Nav);