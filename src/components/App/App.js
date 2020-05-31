import React, { Component } from 'react';
// import * as $ from 'jquery';
import { authEndpoint, clientId, redirectUri, scopes } from '../../config';
import hash from '../../hash';
// import Player from './Player';
import './App.css';
import Playlist from '../CreatePlaylist/Playlist';
// import History from '../History/History';
// import Home from '../Home/Home';
import Routers from '../../Routers';

import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from '../SearchBar/Searchbar';
import PlaylistAdd from '../PlaylistAdd/PlaylistAdd';
import SearchResults from '../SearchResults/SearchResults';

class App extends Component {
  // testing to show what is being played
  // Do not, however, remove constructor and token, playlistName or playlistDescription
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      playlistName: 'New Playlist',
      playlistDescription: '',
      // item: {
      //   album: {
      //     images: [{ url: '' }],
      //   },
      //   name: '',
      //   artists: [{ name: '' }],
      // },
      // is_playing: 'Paused',
      searchResults: [],
      playlistTracks: [],
    };

    // this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    // testing to show what is being played ends here

    this.addPlaylistName = this.addPlaylistName.bind(this);

    this.addPlaylistDescription = this.addPlaylistDescription.bind(this);

    this.savePlaylist = this.savePlaylist.bind(this);
    this.savePlaylistAdd = this.savePlaylistAdd.bind(this);

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.removeTrackSearch = this.removeTrackSearch.bind(this);
    this.doThese = this.doThese.bind(this);
  }

  search(term) {
    let accessToken = hash.access_token;

    fetch(`https://api.spotify.com/v1/search?type=track&q=${term}&limit=10`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      })
      .then(searchResults => {
        this.setState({ searchResults: searchResults });
        console.log(searchResults);
      })
      .catch(error => {
        console.log(error.data);
      });
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
    console.log(tracks);
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let trackSearch = this.state.searchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    trackSearch.unshift(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrackSearch(track) {
    let tracks = this.state.searchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ searchResults: tracks });
  }

  doThese(track) {
    this.addTrack(track);
    this.removeTrackSearch(track);
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylistAdd(name) {
    const trackUris = this.state.playlistTracks.map(track => track.uri);

    if (!name || !trackUris.length) {
      return;
    }

    let accessToken = hash.access_token;
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;
    let playlist = this.state.playlistName;

    fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;

        //post the data and create the playlist
        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: playlist,
            public: 'false',
          }),
        })
          .then(response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;

            fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                  uris: trackUris,
                }),
              }
            ).then(response => response.json())
              .then(jsonResponse => {
                alert('playlist with selected tracks sent to Spotify')
              }).catch(error => {
              console.log(error.data);
            });
          });
      });

    //   savePlaylist(this.state.playlistName, trackUris).then(() => {
    //     this.setState({
    //       playlistName: 'New Playlist',
    //       playlistTracks: [],
    //     });
    //   });
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
      // this.getCurrentlyPlaying(_token);
    }
  }

  //create an empty, collaborative playlist
  savePlaylist(e) {
    e.preventDefault();
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
            Accept: 'application/json',
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
          })
          .catch(error => {
            console.log(error.data);
          });
      });
  }

  // testing to show what is being played
  // getCurrentlyPlaying(token) {
  //   // Make a call using the token
  //   $.ajax({
  //     url: 'https://api.spotify.com/v1/me/player',
  //     type: 'GET',
  //     beforeSend: xhr => {
  //       xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  //     },
  //     success: data => {
  //       this.setState({
  //         item: data.item,
  //         is_playing: data.is_playing,
  //       });
  //     },
  //   });
  //   // refresh the song playing
  //   setTimeout(() => this.getCurrentlyPlaying(token), 7500);
  // }
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

          {/* {this.state.token && (
            // When you have a token show this
            <Player item={this.state.item} is_playing={this.state.is_playing} />
          )} */}
          {this.state.token && (
            //When you have a token show this
            <Routers />
          )}
        </header>
        <main>
          {/* {this.state.token && (
            //When you have a token show this
            <Home />
          )} */}
          {this.state.token && (
            //When you have a token show this
            <SearchBar onSearch={this.search} />
          )}
          {this.state.token && (
            //When you have a token show this
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.doThese}
            />
          )}
          {/* {this.state.token && (
            //When you have a token show this
            <History />
          )} */}
          {this.state.token && (
            //When you have a token show this
            <PlaylistAdd
              playlistTracks={this.state.playlistTracks}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              onSave={this.savePlaylistAdd}
            />
          )}
          {this.state.token && (
            //When you have a token show this
            <Playlist
              onNameChange={this.addPlaylistName}
              onDescriptionChange={this.addPlaylistDescription}
              onSave={this.savePlaylist}
            />
          )}
        </main>
      </div>
    );
  }
}

export default App;
