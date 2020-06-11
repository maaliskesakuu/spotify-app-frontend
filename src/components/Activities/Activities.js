import React, { Component } from 'react';

import PlaylistAdd from '../PlaylistAdd/PlaylistAdd';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/Searchbar';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import hash from '../../hash';

import * as constants from '../../constants/constants';

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
    activity: 'Well-being',
    category_id: 'wellness',
  },
  {
    id: 5,
    activity: 'Something Else',
    category_id: 'somethingelse',
  },
];

class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: activities,
      selectedCategory: '',
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
    };

    this.activityButtonClicked = this.activityButtonClicked.bind(this);
    this.getMusic = this.getMusic.bind(this);

    //to add and remove tracks from the playlist
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.removeTrackSearch = this.removeTrackSearch.bind(this);
    this.doThese = this.doThese.bind(this);
    this.savePlaylistAdd = this.savePlaylistAdd.bind(this);
    // searchbar's search
    this.search = this.search.bind(this);
  }

  // search with a term given by the user
  search(term) {
    let accessToken = hash.access_token;

    fetch(constants.API + `search?type=track,artist&q=${term}&limit=20`, {
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
          uri: track.uri,
          preview: track.preview_url,
          img: track.album.images[0].url,
        }));
      })
      .then(searchResults => {
        this.setState({ searchResults: searchResults });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getMusic() {
    let token = hash.access_token;

    if (this.state.selectedCategory === 'somethingelse') {
      return;
    }

    fetch(
      constants.API +
        `browse/categories/${this.state.selectedCategory}/playlists?limit=2`, //API call to get playlists with category
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

        return ID_array;
      })
      .then(ID_array => {
        for (var i = 0; i < ID_array.length; i++) {
          fetch(
            constants.API + `playlists/${ID_array[i]}/tracks?limit=10`, //API call with playlists IDs to get tracks
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
                uri: item.track.uri,
                preview: item.track.preview_url,
                img: item.track.album.images[0].url,
              }));
            })
            .then(searchResults => {
              this.setState({
                searchResults: this.state.searchResults.concat(searchResults),
              });
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  activityButtonClicked(button) {
    this.setState({ searchResults: [] }); //making tracks empty before making new api call
    this.setState({ selectedCategory: button.target.value }, () => {
      this.getMusic();
    });
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
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

    fetch(constants.API + 'me', { headers: headers })
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;
        //post the data and create the playlist
        fetch(constants.API + `users/${userId}/playlists`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: playlist,
            public: 'true',
          }),
        })
          .then(response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;

            fetch(
              constants.API + `users/${userId}/playlists/${playlistId}/tracks`,
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
              .then(() => {
                alert('playlist with selected tracks added to Spotify');
                this.setState({
                  playlistName: 'New Playlist',
                  playlistTracks: [],
                  searchResults: [],
                });
              })
              .catch(error => {
                console.log(error);
              });
          });
      });
  }

  render() {
    const activityList = this.state.activities.map(activity => {
      return (
        <Button
          key={activity.category_id}
          style={{ margin: '1.3rem', width: '10rem', padding: "1rem" }}
          onClick={this.activityButtonClicked}
          value={activity.category_id}
        >
          {activity.activity}
        </Button>
      );
    });

    return (
      <div>
        <h2 style={{ textAlign: 'center' }} className="my-5">
          What are you in the mood for?
        </h2>
        <Container>
          <Row>{activityList}</Row>
        </Container>
        {this.state.selectedCategory === 'somethingelse' ? (
          <SearchBar onSearch={this.search}></SearchBar>
        ) : (
          ''
        )}
        <SearchResults
          searchResults={this.state.searchResults}
          onAdd={this.doThese}
        />
        {this.state.selectedCategory !== '' ? (
          <PlaylistAdd
            playlistTracks={this.state.playlistTracks}
            onNameChange={this.updatePlaylistName}
            onRemove={this.removeTrack}
            onSave={this.savePlaylistAdd}
            title={this.state.playlistName}
          ></PlaylistAdd>
        ) : (
          ''
        )}
      </div>
    );
  }
}
export default Activities;
