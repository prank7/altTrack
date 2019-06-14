import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { loginAction } from '../store/actions/Action';
import Nav from './Nav';

const API = 'http://localhost:8000/api/v1';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.dispatch(loginAction(this.state));
		this.props.token ? this.props.history.push("/users/org") : this.props.history.push('/users/register');
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	render() {
		return (
			<>
				<div className="columns is-centered">
					<div className="column home-bg-split-left parent">
						{/* <Nav/> */}
						<div className='child'>
							<div className='flex'>
								<i class="fas fa-search home-icons"></i>
								<p className='home-text-left'>Create your organization.</p>
							</div>
							<div className='flex'>
								<i class="fas fa-users home-icons"></i>
								<p className='home-text-left'>Add teams and invite teammates.</p>
							</div>
							<div className='flex'>
								<i class="fas fa-crosshairs home-icons"></i>
								<p className='home-text-left'>Keep track of your team's progress.</p>
							</div>
						</div>
					</div>
					<form className="form column" onSubmit={(e) => this.handleSubmit(e)}>
						<div className='column is-half is-vcentered'>

							<div className="field">
								<label className='label'>email</label>
								<p class="control has-icons-left has-icons-right">
									<input className='input' value={this.state.email} onChange={(e) => this.handleChange(e)} name='email' type='email' placeholder='email' />
									<span class="icon is-small is-left">
										<i class="fas fa-envelope"></i>
									</span>
									<span class="icon is-small is-left">
										<i class="fas fa-envelope"></i>
									</span>
								</p>
							</div>
								
							<div className="field">
								<label className='label'>password</label>
								<input className='input' value={this.state.password} onChange={(e) => this.handleChange(e)} name='password' type='password' placeholder='password'></input>
							</div>
							{
								this.state.email && this.state.password ? 
								<button className="button bg-primary" type='submit'>Log in</button> : null
							}
							<p className='flex register-login-text'>Don't have account?
								<Link to="/users/register">
									<p>Sign up</p>
								</Link>
							</p>
						</div>
					</form>
				</div>
			</>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		token : state.token
	}
}


export default connect(mapStateToProps)(Login);


