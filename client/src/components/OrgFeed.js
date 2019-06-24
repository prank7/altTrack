import React from 'react';
import {connect} from 'react-redux';


class OrgFeed extends React.Component {
	constructor(props) {
		super(props);
	}
	
	// componentDidMount = () => {
	// 	this.props.dispatch(getOrgFeed(orgId));
	// }
	
	render() {
		
		// const {orgId} = this.props;
		// const dete = orgId && orgId.data !== null ? orgId.data : null;
		
		return (
			<>
				<section className='columns is-centered'>
					<div className='column is-4'>
						<div className='post-container'>
							{
								this.props.orgPosts.map(post => {
									return (
										<div className='post'>
											<p>{post.user.name}</p>
											<div className='post-time'>
												<p>{new Date(post.createdAt).toLocaleTimeString()}</p>
												<p>on {new Date(post.createdAt).toDateString()}</p>
											</div>
											
											<p></p>
											<p>{post.didToday}</p>
											<p>{post.learnedToday}</p>


											<button className="button" >{post.tag}</button>
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
		orgId: state.orgId || '',
		orgPosts: state.orgFeed || [],
	}
}

export default connect(mapStateToProps)(OrgFeed);