import React, { Component } from 'react'

class CreateOrganization extends Component {
  render() {
    return (
      <div>
        <form className="ui form">
          <div className="ten wide field">
            <label>Name of organization</label>
            <input type="text"/>
          </div>
          <div className="ten wide field">
            <label>image</label>
            <input type="image"/>
          </div>
          <button className="ui button">Create</button>
        </form>
      </div>
    )
  }
}

export default CreateOrganization;
