import React from 'react';
import Nav from './Nav';
import Organization from './Organization';

class Landing extends React.Component {
	render() {
		return (
			<>
				<Nav />
				<Organization />
			</>
		)
	}
}

export default Landing;