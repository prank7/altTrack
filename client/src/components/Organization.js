import React, { Component } from 'react'
import { connect } from 'react-redux';
import OrganizationList from './OrganizationList';
import { orgList } from '../store/actions/Action';

 class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: '',
      orgName: '',
      location: '',
      creator: localStorage.getItem('id')
    }
  }
  
  onChangeHandler= (e) =>{
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
    this.props.dispatch(orgList(this.state));
  }

  render() {
    return (
    <>
      <div className="ui inverted segment">
        <form onSubmit={this.onClickHandler} encType="multipart/form-data" className="ui inverted form form_create">
          <div className="five wide field">
            <label>Create Organization</label>
            <input type="text" value={this.state.orgName} onChange={this.changeOrgName} />
          </div>
          <div className="five wide field">
            <label>location</label>
            <input type="text" value={this.state.location} onChange={this.handleLocation} />
          </div>
          <div className="five wide field">
            <label>upload image</label>
            <input name="file" onChange={this.onChangeHandler}  type="file"/>
          </div>
          <button  type="submit" className="ui button">Create</button>
        </form>
      </div>
      <OrganizationList/>
    </>
    )
  }
}


export default connect()(Organization);