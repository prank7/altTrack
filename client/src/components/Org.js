import React from 'react';

//show orgs which the user is part of
//show orgs created by logged in user
//show create new org option

class Org extends React.Component {
	render() {
		return(
			<>
				<h1>Welcome User! conditional</h1>
				<div>
					<button>Create a new Organization</button>
				</div>

			</>
		)
	}
}

export default Org;