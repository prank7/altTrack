import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


class Teammate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			teammateEmail: '',
			//Add flag for invite sent?
		}
	}

	updateEmail = (e) => {
		this.setState({
			teammateEmail: e.target.value,
		});
	}

	onClickHandler = (e) => {
		e.preventDefault();
		const token = this.props.token;

		const data = {
			teammateEmail: this.state.teammateEmail,
			};

		axios.post("http://localhost:8000/api/v1/users/org/invite", data, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': "bearer " + token
			}
		}).then(data => console.log(data)
		);
	}


	render() {
		return (
			<>
				<form onSubmit={this.onClickHandler} encType="multipart/form-data" className="ui inverted form form_create">
					<input value={this.state.teammateEmail} onChange={this.updateEmail} type='email' placeholder='Add a teammate' />
					<input type='submit' value='Send Invitation' />
				</form>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.token
	}
}

export default connect(mapStateToProps)(Teammate);