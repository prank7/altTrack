import React from 'react';
// import { Link,withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { registerAction } from '../store/actions/Action';
import Nav from './Nav';

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
		this.props.dispatch(registerAction(this.state));

	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
		this.props.history.push('/login');
	}

	render() {
		return(
			<>
				<Nav/>
				<div className="register">
					<form className="form__signup ui  form" onSubmit={(e)=>this.handleSubmit(e)}>
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
					<button className="ui button" type="submit">Signup</button>
					</form>
				</div>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userData : state.data
	}
}

export default connect(mapStateToProps)(Register);