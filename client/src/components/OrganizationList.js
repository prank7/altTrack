import React, { Component } from 'react';
import { connect } from 'react-redux';

const API = "http://localhost:8000/api/v1";

class OrganizationList extends Component {
  
  constructor() {
    super();
    fetch(`${API}/users/orgdetails`)
    .then( res => res.json())
    .then(data => console.log(data));
  }
  
  render() {
    // console.log(this.props.orgList);
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  orgList: state.orgList
}

export default connect(mapStateToProps)(OrganizationList);