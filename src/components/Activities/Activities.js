import React, { Component } from 'react';

import PlaylistAdd from '../PlaylistAdd/PlaylistAdd';
import SearchResults from '../SearchResults/SearchResults';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import hash from '../../hash';

const activities = [
  {
    id: 1,
    activity: 'Focus',
    category_id: 'focus',
  },
  {
    id: 2,
    activity: 'Work Out',
    category_id: 'workout',
  },
  {
    id: 3,
    activity: 'Sleep',
    category_id: 'sleep',
  },
  {
    id: 4,
    activity: 'Be well',
    category_id: 'wellness',
  },
];

class Activities extends Component {
  // state = { activities: activities };
  constructor(props) {
    super(props);
    this.state = {
      activities: activities,
      selectedCategory: '',
      searchResults: [],
      playlistName: 'New Playlist',
      playlistDescription: '',
      playlistTracks: [],
    };

    this.activityButtonClicked = this.activityButtonClicked.bind(this);
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
      `https://api.spotify.com/v1/browse/categories/${this.state.selectedCategory}/playlists?limit=2`, //API call to get playlists with category
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
                id: item.track.id,
                name: item.track.name,
                artist: item.track.artists[0].name,
                album: item.track.album.name,
                uri: item.track.uri,
                preview: item.track.preview_url,
              }));
            })
            .then(searchResults => {
              this.setState({
                searchResults: this.state.searchResults.concat(searchResults),
              });
              console.log(this.state.searchResults);
            });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  }

  activityButtonClicked(button) {
    this.setState({ selectedCategory: button.target.value }, () => {
      this.getMusic();
    });
    this.setState({ searchResults: [] }); //making tracks empty before making new api call
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
                alert('playlist with selected tracks added to Spotify');
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
    const activityList = this.state.activities.map(activity => {
      return (
        <Button
          style={{ margin: '10px' }}
          onClick={this.activityButtonClicked}
          value={activity.category_id}
        >
          {activity.activity}
        </Button>
      );
    });

    return (
      <div>
        <h2 style={{ color: 'black', textAlign: 'center' }} className="mt-5">What you want to do?</h2>
        <Container>
          <Row>{activityList}</Row>
        </Container>

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
export default Activities;
