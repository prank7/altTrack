import React from 'react';
import Nav from './Nav';
import {connect} from 'react-redux';
import {savePostsAction, getUserPosts} from './../store/actions/Action';

class Posts extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			didToday: '',
			learnedToday: '',
		}

	}

	componentDidMount = () => {
		this.props.dispatch(getUserPosts());
	}
	
	handleFirstInput = (e) => {
		this.setState({
			didToday: e.target.value,
		})
	}

	handleSecondInput = (e) => {
		this.setState({
			learnedToday: e.target.value,
		})
	}

	handleSubmit = () => {
		this.props.dispatch(savePostsAction(this.state));
	}

	render() {
		return(
			<>
			<Nav />
			<div>
				<p>What did you do today?</p>
				<input className="input" onChange={this.handleFirstInput} name="didToday" value={this.state.didToday}/>
			</div>
			<div>
				<p>What did you learn today?</p>
				<input className="input" onChange={this.handleSecondInput}  name="learnedToday" value={this.state.learnedToday} />
				<input onClick={this.handleSubmit} className='button bg-primary' type='submit' value='submit' />
			</div>
			</>
		)
	}
}

function mapStateToProps(state) {
	return {
		post: state
	}
}

export default connect(mapStateToProps)(Posts);