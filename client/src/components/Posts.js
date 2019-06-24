import React from 'react';
import Nav from './Nav';
import {connect} from 'react-redux';
import {savePostsAction, getUserPosts} from './../store/actions/Action';

//For POST success notification message
var isPostSuccess = false;

class Posts extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			didToday: '',
			learnedToday: '',
			// userPosts: null, 
			orgId: '',
			tag: '',
			// isPostSuccess: false,
		}

	}

	componentDidMount = () => {
		// this.props.dispatch(getUserPosts());
		isPostSuccess = false;
	}

	
	handleFirstInput = (e) => {
		var orgid = this.props.data ? this.props.data : '';
		this.setState({
			didToday: e.target.value,
			orgId: orgid._id,
		})
	}

	handleSecondInput = (e) => {
		this.setState({
			learnedToday: e.target.value,
		})
	}

	handleTag = (e) => {
		this.setState({
			tag: e.target.value,
		})
	}

	handleSubmit = () => {
			if(this.state.didToday && this.state.learnedToday && this.state.orgId && this.state.tag) {
				// this.setState({isPostSuccess: !isPostSuccess})
				this.props.dispatch(savePostsAction(this.state));
				this.setState({
					didToday: '',
					learnedToday: '',
					orgId: '',
					tag: '',
					// isPostSuccess: false,
				})
				isPostSuccess = !isPostSuccess;
			}
		// this.props.dispatch(getUserPosts());
	}

	render() {
		return(
			<>
			<section className='columns is-centered'>
				<div className='column is-4'>
					<div className='post-inputs'>
						<p>What did you do today?</p>
						<textarea required type="text" onChange={this.handleFirstInput} name="didToday" value={this.state.didToday} />
					</div>

					<div className='post-inputs'>
						<p>What did you learn today?</p>
						<textarea required onChange={this.handleSecondInput}  name="learnedToday" value={this.state.learnedToday} />
					</div>
					<div>
						<input required type='radio' value='create' checked={this.state.tag === "create" } onChange={this.handleTag} />
						<label>Create</label>
						<input required type='radio' value='iterate' checked={this.state.tag === "iterate" } onChange={this.handleTag} />
						<label>Iterate</label>
						<input required type='radio' value='review' checked={this.state.tag === "review" } onChange={this.handleTag} />
						<label>Review</label>
					</div>
					{
						isPostSuccess ? <p className="notification-text">Post successfull !</p> : null
					}
					<input onClick={this.handleSubmit} className='button bg-primary' type='submit' value='submit' />
				</div>
			</section>
			{/* User Posts Section */}
			{/* <section className='columns is-centered'>
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
			</section> */}
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