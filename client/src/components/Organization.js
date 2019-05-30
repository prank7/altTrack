import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
// import { createOrg } from '../store/actions/Action';

 class Organization extends Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null,
        orgName: '',
      }
  }
  
  onChangeHandler= (e) =>{
    this.setState({
      selectedFile: e.target.files[0]
    })
  }

  changeOrgName = (e) => {
    this.setState({
      orgName: e.target.value
    })
  }

  onClickHandler = (e) => {
    e.preventDefault();
    // this.props.dispatch(createOrg(this.state));
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    data.append('name', this.state.orgName)
    axios.post("http://localhost:8000/api/v1/users/org", data, { 
      headers: { 'Content-Type': 'multipart/form-data'}
    })
   .then(res => { // then print response status
    console.log(res.statusText)
  })
  }

  render() {
    return (
      <div className="ui inverted segment">
        <form onSubmit={this.onClickHandler} encType="multipart/form-data" className="ui inverted form form_create">
          <div className="five wide field">
            <label>Create Organization</label>
            <input type="text" value={this.state.orgName} onChange={this.changeOrgName} />
          </div>
          <div className="five wide field">
            <label>upload image</label>
            <input name="file" onChange={this.onChangeHandler}  type="file"/>
          </div>
          <button  type="submit" className="ui button">Create</button>
        </form>
      </div>
    )
  }
}

export default connect()(Organization);