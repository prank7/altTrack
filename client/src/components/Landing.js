import React from 'react';
import Nav from './Nav';
import Organization from './Organization';
import Footer from './Footer';

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