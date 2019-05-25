import React from 'react';
import { Link } from "react-router-dom";

const API = 'http://localhost:8000/api/v1';

class Login extends React.Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let data = this.state;
		console.log(data, 'before fetch in Login');
		fetch(`${API}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if(data.success) {
				this.props.history.push('/')
			}
		});
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	render() {
		return (
			<>
				<form className="form__login ui form" onSubmit={(e) => this.handleSubmit(e)}>
				<div className="five wide field">
					<label>email</label>
					<input value={this.state.email} onChange={(e) => this.handleChange(e)} name='email' type='email' placeholder='email'></input>
				</div>
					
				<div className="five wide field">
					<label>password</label>
					<input value={this.state.password} onChange={(e) => this.handleChange(e)} name='password' type='password' placeholder='password'></input>
				</div>
					
					<button className="ui button" type='submit'>Log in</button>
				</form>
			</>
		)
	}
}

export default Login;


