import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import OrganizationList from './OrganizationList';
import { getOrgList } from '../store/actions/Action';

 class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      orgName: '',
      location: '',
      creator: localStorage.getItem('id')
    }
  }
  
  componentDidMount = () => {
    // console.log("called in cdm");
    this.props.dispatch(getOrgList())
  }
  
  onChangeHandler = (e) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  }

  changeOrgName = (e) => {
    this.setState({
      orgName: e.target.value
    });
  }

  handleLocation = (e) => {
    this.setState({
      location: e.target.value
    })
  }

  onClickHandler = (e) => {
    e.preventDefault();
    const token = this.props.token;
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    data.append('name', this.state.orgName);
    data.append('location',this.state.location);
    data.append('creator',this.state.creator);

    axios.post("http://localhost:8000/api/v1/users/org", data, { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': "bearer " + token
    }
    }).then(data => {
      // console.log(data, 'this is freaking data coming after Axios POST request');
      this.props.dispatch({
        type: 'ORGANIZATIONS',
        payload: data
      })
    });
  }

  render() {
    return (
    <>
      <div className="columns">
        <form onSubmit={this.onClickHandler} encType="multipart/form-data" className="column is-half">
          <div className='column is-6'>
            <div className="five wide field">
              <label className='label'>Create Organization</label>
              <input className='input' type="text" value={this.state.orgName} onChange={this.changeOrgName} />
            </div>
            <div className="five wide field">
              <label className='label'>location</label>
              <input className='input' type="text" value={this.state.location} onChange={this.handleLocation} />
            </div>
            <div className="five wide field">
              <label className='label'>upload image</label>
              <input className='input' name="file" onChange={this.onChangeHandler}  type="file"/>
            </div>
            <button type="submit" className="button bg-primary">Create</button>
          </div>
        </form>
        <div className='column is-half'>
          <OrganizationList/>
        </div>
      </div>
    </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  }
}

export default connect(mapStateToProps)(Organization);