import React, { Component } from 'react'
import { connect } from 'react-redux';
import OrganizationList from './OrganizationList';
import { orgList } from '../store/actions/Action';
import axios from 'axios';
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
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/altify/image/upload';
    const CLOUDINARY_PRESET = 'esj6xqzd';
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('cloud_name', 'altify');
    formData.append('upload_preset', CLOUDINARY_PRESET);
    axios
    .post(CLOUDINARY_URL, formData, {
      crossdomain: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      if(res.status == 200){
        const {secure_url} = res.data;
        this.setState({
          selectedFile : secure_url
        })
      }
    })
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
    console.log(this.state.selectedFile, 'set in state')
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