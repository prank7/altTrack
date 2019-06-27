import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class OrganizationList extends Component {
  constructor() {
    super();
    
  }

  render() {
    const {orgList} = this.props;
    return (  
      <>
        <div className='org-list-container'>
          <h3>Organizations</h3>
          {
            !orgList.length ? <p>There are no organizations to show.</p> : null
          }
          {
            orgList && orgList.map(elm => {
              return (
                <>
                  <div className='icard'>
                    <div className='icard-image flex'>
                      <i className="fas fa-users"></i>
                      <div className='icard-content'>
                        <Link to={`/users/org/${elm._id}`}>
                          <div>{elm.name}</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orgList: state.orgList
  }
}

export default connect(mapStateToProps)(OrganizationList);