import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import OrgDetails from './OrgDetails';
import OrgFeed from './OrgFeed';
import OrganizationList from './OrganizationList';
import Organization from './Organization';

class Landing extends React.Component {
	render() {
		return (
			<>
				<Nav />
				<Organization />
				{/* <OrganizationList />
				<OrgFeed /> */}
				<Footer />

			</>
		)
	}
}

export default Landing;