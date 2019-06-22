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
			userPosts: null, 
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
		this.setState({
			didToday: '',
			learnedToday: '',
		})
		this.props.dispatch(getUserPosts());
	}

	render() {
		const userPosts = this.props.posts ?  this.props.posts : [];
		
		return(
			<>
			<Nav />
			<section className='columns is-centered'>
				<div className='column is-4'>
					<div className='post-inputs'>
						<p>What did you do today?</p>
						<textarea type="text" onChange={this.handleFirstInput} name="didToday" value={this.state.didToday} />
					</div>

					<div className='post-inputs'>
						<p>What did you learn today?</p>
						<textarea onChange={this.handleSecondInput}  name="learnedToday" value={this.state.learnedToday} />
					</div>
					<input onClick={this.handleSubmit} className='button bg-primary' type='submit' value='submit' />
				</div>
			</section>
			{/* User Posts Section */}
			<section className='columns is-centered'>
				<div className='column is-4'>
					<div className='post-container'>
						{
							userPosts.map(post => {
								return (
									<div className='post'>
										<div class='post-time'>
											<p>{new Date(post.createdAt).toLocaleTimeString()}</p>
											<p>on {new Date(post.createdAt).toDateString()}</p>
										</div>
										
										<p></p>
										<p>{post.didToday}</p>
										<p>{post.learnedToday}</p>

									</div>
								)
							})	
						}	
					</div>
				</div>
			</section>
			</>
		)
	}
}

function mapStateToProps(state) {
	return {
		posts: state.userPosts
	}
}

export default connect(mapStateToProps)(Posts);