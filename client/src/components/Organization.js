import React, { Component } from 'react'

 class Organization extends Component {
  render() {
    return (
      <div>
        <form className="ui form form_create">
          <div className="five wide field">
            <label>Create Organization</label>
            <input type="text"/>
          </div>
          <div className="five wide field">
            <label>upload image</label>
            <input type="file"/>
          </div>
          <button type="submit" className="ui button">Create</button>
        </form>
      </div>
    )
  }
}

export default Organization;