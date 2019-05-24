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
				<section>
					<div>
						<h3 className="form-header">Sign up for an account</h3>
					</div>
					<div className="form-container">
						<form className="form" onSubmit={(e)=>this.handleSubmit(e)}>
							<input value={this.state.name} onChange={(e) => this.handleChange(e)} autofocus required type="text" name="name" placeholder="Enter your name" />
							<input value={this.state.email} onChange={(e) => this.handleChange(e)} required type="text" name="email" placeholder="Enter your email" />
							<input value={this.state.password} onChange={(e) => this.handleChange(e)} required type="password" name="password" placeholder="Enter password" />
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

export default (Register);