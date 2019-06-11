import React from 'react';
import Teammate from './Teammate';
// import {connect} from 'react-redux';


class OrgDetails extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			org: null,
		}
	}

	componentDidMount = () => {
		fetch(`http://localhost:8000/users/org/${this.props.match.params.id}`)
		.then(res => res.json())
    .then(data => {
			console.log(data, 'data in orgDetails Fetch');
			this.setState({org: data.org})
    })
	}

	render() {
		return (
				<section className='org-details-container'>
					<h3>Organization Details</h3>
					{
					this.state.org ? (
						<>
						<div className='org-details-sub-container'>
							<span className='org-details'>
								<p>Name: </p>
								<p> {this.state.org.name}</p>
							</span>
							<span className='org-details'>
								<p>Location: </p>
								<p> {this.state.org.location}</p>
							</span>
							<span className='org-details'>
								<p>Created by: </p>
								<p> {this.state.org.creator.name}</p>
							</span>
						</div>
						</>
					) : null
					}
				<Teammate data={this.state.org}/>
				</section>
		)
	}
}

export default OrgDetails;

// const mapStateToProps = (state) => {
// 	return {
// 		orgDetails: state
// 	}
// }

// export default connect(mapStateToProps)(OrgDetails);