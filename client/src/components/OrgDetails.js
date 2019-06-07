import React from 'react';
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
				<section>
					<h3>Organization Details</h3>
					{
					this.state.org ? (
						<>
							<p>{this.state.org.name}</p>
							<p>{this.state.org.location}</p>
							<p>{this.state.org.creator.name}</p>
						</>
					) : null
					}
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