import React, { Component } from 'react'
import axios from 'axios';


 class Organization extends Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null,
        orgName: '',
      }
  }
  
  onChangeHandler=event=>{
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  changeOrgName = (e) => {
    this.setState({
      orgName: e.target.value
    })
  }

  onClickHandler = (e) => {
    console.log('Comming in here')
    e.preventDefault();
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    data.append('name', this.state.orgName)
    console.log(data, this.state.orgName, this.state.selectedFile);

    axios.post("http://localhost:3001/api/v1/users/org", data, { 
       // receive two    parameter endpoint url ,form data
      headers: { 'Content-Type': 'multipart/form-data'}
    })
   .then(res => { // then print response status
    console.log(res.statusText)
  })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onClickHandler} className="ui form form_create">
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

export default Organization;