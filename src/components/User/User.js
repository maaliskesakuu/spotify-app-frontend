import React, { Component } from 'react';
import hash from '../../hash';

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

    fetch('https://api.spotify.com/v1/me/', {
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
          followers: jsonResponse.country,
          country: jsonResponse.country,
          spotifyUrl: jsonResponse.external_urls.spotify,
          email: jsonResponse.email,
        });
      });
  };

  render() {
    return (
      <div>
        <h4>User data</h4>
        <div>Name: {this.state.displayName}</div>
        <div>User id: {this.state.userId}</div>
        <div>Email: {this.state.email}</div>
        <div>Country: {this.state.country}</div>
        <div>Followers: {this.state.followers}</div>
        <div>
          Spotify URI:{' '}
          <a
            href={this.state.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.state.spotifyUrl}
          </a>
        </div>
      </div>
    );
  }
}

export default User;
