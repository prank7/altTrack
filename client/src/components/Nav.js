import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
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
  );
};


export default Nav;