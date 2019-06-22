import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class OrganizationList extends Component {
  constructor() {
    super();
    
  }

  // handleClick = (id) => {
  //   fetch(`http://localhost:8000/users/org/${id}`)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data, 'data in orgDetails Fetch');
  //     this.props.history.push('/users/org/orgdetails')
  //   })
  // }

  render() {
    const {orgList} = this.props;
    // console.log(orgList, 'this is OrgLIST in Props', this.props);
    return (  
      <>
        <section >
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
        </section>
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