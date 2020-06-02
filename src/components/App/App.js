import React, { Component } from 'react';
import { authEndpoint, clientId, redirectUri, scopes } from '../../config';
import hash from '../../hash';
import './App.css';
import Playlist from '../CreatePlaylist/Playlist';
// import History from '../History/History';
// import Home from '../Home/Home';
// import Routers from '../../Routers';

import 'bootstrap/dist/css/bootstrap.min.css';
// import SearchBar from '../SearchBar/Searchbar';
// import PlaylistAdd from '../PlaylistAdd/PlaylistAdd';
// import SearchResults from '../SearchResults/SearchResults';
import Activities from '../Activities/Activities';
//import Button from 'react-bootstrap/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      playlistName: 'New Playlist',
      playlistDescription: '',
      searchResults: [],
      playlistTracks: [],
    };

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

  // getMusic() {
  //   let token = hash.access_token;
  //   fetch(
  //     `https://api.spotify.com/v1/browse/categories/${this.props.category_id}/playlists?limit=2`, //API call to get playlists with category
  //     {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   )
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(jsonResponse => {
  //       if (!jsonResponse.playlists) {
  //         return [];
  //       }

  //       //Making array with playlist IDs
  //       var ID_array = [];
  //       jsonResponse.playlists.items.forEach(item => {
  //         ID_array.push(item.id);
  //       });
  //       console.log(ID_array);

  //       return ID_array;
  //     })
  //     .then(ID_array => {
  //       for (var i = 0; i < ID_array.length; i++) {
  //         fetch(
  //           `https://api.spotify.com/v1/playlists/${ID_array[i]}/tracks?limit=10`, //API call with playlists IDs to get tracks
  //           {
  //             headers: {
  //               Accept: 'application/json',
  //               'Content-Type': 'application/json',
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         )
  //           .then(response => {
  //             return response.json();
  //           })
  //           .then(jsonResponse => {
  //             console.log(jsonResponse);
  //             let searchResults = jsonResponse.items
  //               .map(item => {
  //                 return {
  //                   //Now showing only track name and artist. Modify this.
  //                   //Added id, album and uri
  //                   name: item.track.name,
  //                   artist: item.track.artists[0].name,
  //                   id: item.track.id,
  //                   album: item.track.album.name,
  //                   uri: item.track.uri,
  //                 };
  //               })
  //               .then(() => {
  //                 this.setState({ searchResults: searchResults });
  //                 console.log(this.state.searchResults);
  //               });
  //           });
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error.data);
  //     });
  // }

  search(term) {
    let accessToken = hash.access_token;

    fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}%20genre:sleep&limit=10`,
      {
        // fetch(`https://api.spotify.com/v1/search?type=track&q=%20genre:workout&limit=10`, {
        // fetch(`https://api.spotify.com/v1/search?type=track&q=${term}%20genre:focus&limit=10`, {
        // fetch(`https://api.spotify.com/v1/search?&type=playlist&q=${term}&limit=10`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          // if (!jsonResponse.playlists) {
          return [];
        }
        // return jsonResponse.playlists.items.map(playlist => ({
        //   id: playlist.id,
        //   name: playlist.name,
        //   description: playlist.description,
        //   owner: playlist.owner.display_name,
        //   uri: playlist.uri,
        //   tracks: playlist.tracks.total
        // }))
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          preview: track.preview_url,
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
            )
              .then(response => response.json())
              .then(jsonResponse => {
                console.log(jsonResponse);
                alert('playlist with selected tracks sent to Spotify');
              })
              .then(() => {
                this.setState({
                  playlistName: 'New Playlist',
                  playlistTracks: [],
                });
              })
              .catch(error => {
                console.log(error.data);
              });
          });
      });
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
          .then(() => {
            this.setState({
              playlistName: 'New Playlist',
              playlistDescription: '',
            });
            console.log(this.state.playlistName);
            console.log(this.state.playlistDescription);
          })
          .catch(error => {
            console.log(error.data);
          });
      });
  }

  render() {
    return (
      <div className="App">
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
            //When you have a token show this
            <Routers />
          )} */}
        </header>
        <main>
          {/* {this.state.token && (
            <Home />
          )} */}
          {this.state.token && <Activities />}
          {/* {this.state.token && <SearchBar onSearch={this.search} />} */}
          {/* <div className="App-playlist">
            {this.state.token && (
              <SearchResults
                searchResults={this.state.searchResults}
                onAdd={this.doThese}
              />
            )}
          </div> */}
          {/* {this.state.token && (
            <History />
          )} */}
          {/* {this.state.token && (
            <PlaylistAdd
              playlistTracks={this.state.playlistTracks}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              onSave={this.savePlaylistAdd}
              title={this.state.playlistName}
            />
          )} */}
          {this.state.token && (
            <Playlist
              onNameChange={this.addPlaylistName}
              onDescriptionChange={this.addPlaylistDescription}
              onSave={this.savePlaylist}
              description={this.state.playlistDescription}
              title={this.state.playlistName}
            />
          )}
        </main>
      </div>
    );
  }
}

export default App;
