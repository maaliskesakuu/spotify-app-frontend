import React, { Component } from 'react';
// import React, { useState } from 'react';
import PlaylistAdd from '../PlaylistAdd/PlaylistAdd';
import SearchResults from '../SearchResults/SearchResults';

import hash from '../../hash';

import Button from 'react-bootstrap/Button';

class TrackResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      playlistName: 'New Playlist',
      playlistDescription: '',
      searchResults: [],
      playlistTracks: [],
    };

    this.getMusic = this.getMusic.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.removeTrackSearch = this.removeTrackSearch.bind(this);
    this.doThese = this.doThese.bind(this);
    this.savePlaylistAdd = this.savePlaylistAdd.bind(this);
  }

  getMusic() {
    let token = hash.access_token;
    fetch(
      `https://api.spotify.com/v1/browse/categories/${this.props.category_id}/playlists?limit=2`, //API call to get playlists with category
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (!jsonResponse.playlists) {
          return [];
        }

        //Making array with playlist IDs
        var ID_array = [];
        jsonResponse.playlists.items.forEach(item => {
          ID_array.push(item.id);
        });
        console.log(ID_array);

        return ID_array;
      })
      .then(ID_array => {
        for (var i = 0; i < ID_array.length; i++) {
          fetch(
            `https://api.spotify.com/v1/playlists/${ID_array[i]}/tracks?limit=10`, //API call with playlists IDs to get tracks
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .then(response => {
              return response.json();
            })
            .then(jsonResponse => {
              if (!jsonResponse.items) {
                return [];
              }
              return jsonResponse.items.map(item => ({
                name: item.track.name,
                artist: item.track.artists[0].name,
                id: item.track.id,
                album: item.track.album.name,
                uri: item.track.uri,
              }));
            })
            .then(searchResults => {
              this.setState({ searchResults: searchResults });
              console.log(searchResults);
            });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  }

  // const TrackResults = props => {
  //   const [track, setTrack] = useState([]);

  //   let token = hash.access_token;

  //   const getMusic = async () => {
  //     fetch(
  //       `https://api.spotify.com/v1/browse/categories/${props.category_id}/playlists?limit=2`, //API call to get playlists with category
  //       {
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //       .then(response => {
  //         return response.json();
  //       })
  //       .then(jsonResponse => {
  //         if (!jsonResponse.playlists) {
  //           return [];
  //         }

  //         //Making array with playlist IDs
  //         var ID_array = [];
  //         jsonResponse.playlists.items.forEach(item => {
  //           ID_array.push(item.id);
  //         });
  //         console.log(ID_array);

  //         return ID_array;
  //       })
  //       .then(ID_array => {
  //         for (var i = 0; i < ID_array.length; i++) {
  //           fetch(
  //             `https://api.spotify.com/v1/playlists/${ID_array[i]}/tracks?limit=10`, //API call with playlists IDs to get tracks
  //             {
  //               headers: {
  //                 Accept: 'application/json',
  //                 'Content-Type': 'application/json',
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             }
  //           )
  //             .then(response => {
  //               return response.json();
  //             })
  //             .then(responseInJson => {
  //               console.log(responseInJson);
  //               var mappedTracks = responseInJson.items.map(item => {
  //                 return {
  //                   //Now showing only track name and artist. Modify this.
  //                   //Added id, album and uri
  //                   name: item.track.name,
  //                   artist: item.track.artists[0].name,
  //                   id: item.track.id,
  //                   album: item.track.album.name,
  //                   uri: item.track.uri,
  //                 };
  //               });
  //               console.log(mappedTracks);
  //               setTrack(mappedTracks);
  //             });
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error.data);
  //       });
  //   };

  // const tracklist = track.map(item => {
  // tracklist = this.state.searchResults.map(item => {
  //     //Now showing only track name and artist. Modify this.
  //     //Added id, album and uri
  //     return (
  //       <div>
  //         <div className="Track-information">
  //           <h3>{item.name}</h3>
  //           {item.artist} | {item.album}
  //           <iframe
  //             src={'https://open.spotify.com/embed/track/' + item.id}
  //             width="300"
  //             height="80"
  //             frameBorder="0"
  //             allowtransparency="true"
  //             allow="encrypted-media"
  //             title="preview"
  //           />
  //         </div>
  //       </div>
  //     );
  //   });

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

  render() {
    return (
      <div>
        <Button style={{ margin: '10px' }} onClick={this.getMusic}>
          {this.props.activity}
        </Button>
        {/* {tracklist} */}
        <SearchResults
          searchResults={this.state.searchResults}
          onAdd={this.doThese}
        />
        <PlaylistAdd
          playlistTracks={this.state.playlistTracks}
          onNameChange={this.updatePlaylistName}
          onRemove={this.removeTrack}
          onSave={this.savePlaylistAdd}
          title={this.state.playlistName}
        />
      </div>
    );
  }
}

export default TrackResults;
