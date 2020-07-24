import React, { Component } from 'react';
import axios from 'axios';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentWillMount() {
    axios.get('/saved_vehicles')
      .then(({data})=> {
        this.setState({
          data: data
        });
    }).catch((err)=> {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <p> Profile Page </p>
        {this.state.data.map((e, key) => {
          return <p> {e.vehicle_id} </p>
        })}
      </div>
    )
  }
}
