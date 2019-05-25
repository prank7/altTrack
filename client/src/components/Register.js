import React from 'react';
import { Link,withRouter } from "react-router-dom";

const API = 'http://localhost:8000/api/v1';

class Register extends React.Component {
	constructor() {
		super();

		this.state = {
			name: '',
			email: '',
			password: '',
		}
	}

	handleSubmit =(e)=> {
		e.preventDefault();
		let data = this.state
		console.log(data,"brfore fetch")
		fetch(`${API}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if(data.success){
				this.props.history.push('/users/login')
			}
		});
		// console.log('form submission data', data);
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	componentDidMount() {
	
	}

	render() {
		return(
			<>
				<div>
					<form className="form__signup ui form" onSubmit={(e)=>this.handleSubmit(e)}>
					<div className="field">
					<label>username:</label>
					<input value={this.state.name} onChange={(e) => this.handleChange(e)} type="text" name="name"/><br/>
					</div>
					<div className="field">
					<label>email:</label>
						<input value={this.state.email} onChange={(e) => this.handleChange(e)} type="email" name="email" /><br/><br/>
					</div>
					<div className="field">
					<label>password:</label>
						<input value={this.state.password} onChange={(e) => this.handleChange(e)} type="password" name="password"/><br/><br/>
					</div>
					<button type="submit ui button">Signup</button>
					</form>
					<div>
						<p>Already have an account?</p>
						<Link to='/users/login'>Sign in</Link>
					</div>
				</div>
			</>
		)
	}
}

export default (Register);