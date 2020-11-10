import React, { Component } from "react";
import "./PlaylistAdd.css";
import TrackList from "../TrackList/TrackList";

import { Button, CardDeck, Container } from "react-bootstrap";

class PlaylistAdd extends Component {

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <Container className="Playlist mb-5">
        <Container className="mb-3 mx-0 px-0">
          <input
            onChange={this.handleNameChange.bind(this)} 
            value={this.props.title}
          ></input>
          <CardDeck>
            <TrackList
              tracks={this.props.playlistTracks}
              isRemoval={true}
              onRemove={this.props.onRemove}
              muted={this.props.muted}
            />
          </CardDeck>
          <Button
            size="lg"
            className="my-3 ml-3"
            onClick={this.props.onSave}
            style={{ backgroundColor: "rgb(126, 2, 214)", border: "none" }}
          >
            Save to Spotify
          </Button>
        </Container>
      </Container>
    );
  }
}

export default PlaylistAdd;
