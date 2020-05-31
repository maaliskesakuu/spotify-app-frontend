import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList';

class PlaylistAdd extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div>
        <input
          onChange={this.handleNameChange}
          defaultValue={'New Playlist'}
        ></input>
        <TrackList
          tracks={this.props.playlistTracks}
          isRemoval={true}
          onRemove={this.props.onRemove}
        />
        <button onClick={this.props.onSave}>Save to Spotify</button>
      </div>
    );
  }
}

export default PlaylistAdd;
