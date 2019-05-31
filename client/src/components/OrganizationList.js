import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class OrganizationList extends Component {
  
  render() {
    const {orgList} = this.props
    return (
      <div>
        {
          orgList && orgList.map(single => 
          <>
          <div key={single._id}>
              <Link to={`/users/singleorg/${single._id}`}>{single.name}</Link>
              <img src={`public/uploads/${single.imageUrl.name}`} alt=""/>  
          </div>
          </>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orgList : state.orgList
  }
}

export default connect(mapStateToProps)(OrganizationList);