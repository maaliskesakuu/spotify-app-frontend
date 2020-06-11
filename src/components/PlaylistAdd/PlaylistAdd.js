import React, { Component } from 'react';
import './PlaylistAdd.css';
import TrackList from '../TrackList/TrackList';

import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';

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
        <Container>
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
        <Button variant="warning" className="my-3" onClick={this.props.onSave}>
            Save to Spotify
        </Button>
        </Container>
      </div>
    );
  }
}

export default PlaylistAdd;
