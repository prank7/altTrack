import React from 'react';
import { Link } from "react-router-dom";

class Login extends React.Component {
	render() {
		return (
			<>
				<form action='/users/login' method='POST'>
					<input name='email' type='email' placeholder='email'></input>
					<input name='password' type='password' placeholder='password'></input>
					<button type='submit'>Log in</button>
				</form>
				<a href="">Forgot password?</a>
				<Link to='/users/register'>Register</Link>
			</>
		)
	}
}

export default Login;



