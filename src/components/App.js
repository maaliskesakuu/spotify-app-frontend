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
  // Do not, however, remove constructor and token, playlistName or playlistDescription
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      playlistName: 'New Playlist',
      playlistDescription: '',
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
    // testing to show what is being played ends here

    this.addPlaylistName = this.addPlaylistName.bind(this);

    this.addPlaylistDescription = this.addPlaylistDescription.bind(this);

    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addPlaylistName(name) {
    this.setState({ playlistName: name });
  }

  addPlaylistDescription(desc) {
    this.setState({ playlistDescription: desc });
  }

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

  //create an empty, private playlist
  savePlaylist() {
    let accessToken = hash.access_token;

    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;
    let playlist = this.state.playlistName;
    let playlistDesc = this.state.playlistDescription;

    //get userId
    fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;

        //post the data and create the playlist
        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: playlist,
            description: playlistDesc,
            collaborative: true,
            public: 'false',
          }),
        })
          .then(response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            alert(`Created a new playlist, id: ${playlistId}`);
          });
      });
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
            <CreatePlaylist
              onNameChange={this.addPlaylistName}
              onDescriptionChange={this.addPlaylistDescription}
              onSave={this.savePlaylist}
            />
          )}
        </header>
      </div>
    );
  }
}

export default App;
