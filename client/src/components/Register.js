import React from 'react';
// import { Link,withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { registerAction } from '../store/actions/Action';
import Nav from './Nav';
var queryString = require('query-string');


class Register extends React.Component {
	constructor() {
		super();

		this.state = {
			name: '',
			email: '',
			password: '',
			isInvited: false,
		}
	}

	componentDidMount = () => {
		const {ref} = queryString.parse(location.search);
		if(ref) {
			fetch(`http://localhost:8000/users/register/verify/${ref}`)
			.then(res => res.json())
			.then(({foundTeammate: {teammateEmail}}) => {
				this.setState(state => ({
					...state,
					email: teammateEmail,
					isInvited: true,
				}))
			})
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
		// this.props.history.push('/login');
	}



	render() {
		return(
			<>
				<Nav/>
				<div className="register">
					<form className="form__signup ui  form" onSubmit={(e)=>this.handleSubmit(e)}>
					<div className="field">
					<label>name:</label>
					<input value={this.state.name} onChange={(e) => this.handleChange(e)} type="text" name="name"/><br/>
					</div>
					<div className="field">
					<label>email:</label>
					<input disabled={this.state.isInvited} value={this.state.email || ''} onChange={(e) => this.handleChange(e)} type="email" name="email" /><br/><br/>
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