import React, { Component } from 'react';
import './PlaylistAdd.css';
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
      <div className="Playlist">
        <input
          onChange={this.handleNameChange}
          value={this.props.title}
        ></input>
        <TrackList
          tracks={this.props.playlistTracks}
          isRemoval={true}
          onRemove={this.props.onRemove}
        />
        <button className="Playlist-save" variant="success" onClick={this.props.onSave}>Save to Spotify</button>
      </div>
    );
  }
}

export default PlaylistAdd;
