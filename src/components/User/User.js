import React, { Component } from 'react';
import hash from '../../hash';

import Table from 'react-bootstrap/Table';

import * as constants from '../../constants/constants';

class User extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      userId: '',
      displayName: '',
      followers: '',
      country: '',
      spotifyUrl: '',
      email: '',
      product: '',
      type: '',
    };
    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token,
      });
      this.getUserData(_token);
    }
  }

  // fetching user data
  getUserData = token => {
    fetch(constants.API + 'me/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        this.setState({
          userId: jsonResponse.id,
          displayName: jsonResponse.display_name,
          followers: jsonResponse.followers.total,
          country: jsonResponse.country,
          spotifyUrl: jsonResponse.external_urls.spotify,
          email: jsonResponse.email,
          product: jsonResponse.product,
          type: jsonResponse.type,
        });
      });
  };

  render() {
    return (
      <div style={{height: "100vh"}}>
        <h2 className="my-5 head">User Data</h2>
        <Table responsive bordered hover variant="dark">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{this.state.displayName}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Email</th>
              <td>{this.state.email}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Country</th>
              <td>{this.state.country}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>User id</th>
              <td>{this.state.userId}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Followers</th>
              <td>{this.state.followers}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Spotify URI</th>
              <td>
                {' '}
                <a
                  href={this.state.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.spotifyUrl}
                </a>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Subscription level</th>
              <td>{this.state.product}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Type</th>
              <td>{this.state.type}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default User;
