import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Organization from './Organization';

class Landing extends React.Component {
	render() {
		return (
			<>
				<Nav />
				<Organization />
				<Footer />
			</>
		)
	}
}

export default Landing;