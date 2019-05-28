import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import rocketship from "./../rocketship.svg";

class Home extends React.Component {
	render() {
		return(
			<>
				<div className="heading__background--1">
          <Link to="/"><h1 className="heading__homepage--1">altify</h1></Link>
          
          <Nav/>
          <img src={rocketship} style={{width: "50%", margin: "4rem 0 0 9rem"}}/>
        </div>
        <div className="heading__background--2">
          <h4 className="heading__homepage--2">
          Keep track of your daily 
          <span className="pencil">&#9998;</span>
          <span className="update--text">Update</span>
          </h4>
        </div>
			</>
		)
	}
}

export default Home;