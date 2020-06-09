import React, { Component } from 'react';
import './PlaylistAdd.css';
import TrackList from '../TrackList/TrackList';

import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';

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
        <CardDeck>
          <TrackList
            tracks={this.props.playlistTracks}
            isRemoval={true}
            onRemove={this.props.onRemove}
          />
        </CardDeck>
        <Button variant="success" className="mt-3" onClick={this.props.onSave}>
          Save to Spotify
        </Button>
      </div>
    );
  }
}

export default PlaylistAdd;
