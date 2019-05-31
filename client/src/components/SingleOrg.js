import React, { Component } from 'react'
import { connect } from 'react-redux';


class SingleOrg extends Component {

  constructor() {
    super();
    this.state = {
      email: ""
    }
  }

  handleEmail = (e) => {
    this.setState({
     email: e.target.value
    })
  }

  handleClick = (e) => {
    e.preventDefault();
    
  }

  render() {
    const { orgList } = this.props;
     const matchId = orgList.filter(obj => obj._id === this.props.match.params.id)[0];
     console.log(matchId);
    return (
      <div>
        <div>
          <h3>Welocome to {matchId.name}</h3>
          <p>{matchId.location}</p>
        </div>
        <div>
          <form className="ui form">
            <div className="field">
              <input type="email" name="email" onChange={this.handleEmail}/>
              <button className="ui button" onClick={this.handleClick}>invite</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orgList : state.orgList
  }
}

export default connect(mapStateToProps)(SingleOrg);