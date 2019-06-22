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
				<section>
					<div>
						<p>This is feed yeah!!!</p>
					</div>
				</section>

			</>
		)
	}
}

function mapStateToProps(state) {
	return {
		orgId: state.orgId || '',
	}
}

export default connect(mapStateToProps)(OrgFeed);