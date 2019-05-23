import React from 'react';
import { Link } from "react-router-dom";

class Register extends React.Component {
	render() {
		return(
			<>
				<section>
					<div>
						<h3 className="form-header">Sign up for an account</h3>
					</div>
					<div className="form-container">
						<form className="form" action="/users/register" method="POST">
							<input autofocus required type="text" name="name" placeholder="Enter your name" />
							<input required type="text" name="email" placeholder="Enter your email" />
							<input required type="password" name="password" placeholder="Enter  password" />
							<button type="submit">Sign Up</button>
						</form>
					</div>
					<div>
						<p>Already have an account?</p>
						<Link to='/users/login'>Sign in</Link>
					</div>
				</section>
			</>
		)
	}
}

export default Register;