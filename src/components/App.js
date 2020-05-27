import React, { Component } from 'react';
import * as $ from 'jquery';
import { authEndpoint, clientId, redirectUri, scopes } from '../config';
import hash from '../hash';
import Player from './Player';
import './App.css';
import CreatePlaylist from './CreatePlaylist/CreatePlaylist';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  // testing to show what is being played
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: '' }],
        },
        name: '',
        artists: [{ name: '' }],
      },
      is_playing: 'Paused',
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
  // testing to show what is being played ends here

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
      this.getCurrentlyPlaying(_token);
    }
  }

  // testing to show what is being played
  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player',
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: data => {
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
        });
      },
    });
    // refresh the song playing
    setTimeout(() => this.getCurrentlyPlaying(token), 7500);
  }
  // testing to show what is being played ends here

  render() {
    return (
      <div>
        <header>
          {!this.state.token && (
            // this is the call to the Spotify Account Service
            <a
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                '%20'
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}

          {this.state.token && (
            // When you have a token show this
            <Player item={this.state.item} is_playing={this.state.is_playing} />
            )}
          {this.state.token && (
            // When you have a token show this
            <CreatePlaylist />
            )}            
        </header>
      </div>
    );
  }
}

export default App;
