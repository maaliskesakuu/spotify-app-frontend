import React, { Component } from "react";
import "./PlaylistAdd.css";
import TrackList from "../TrackList/TrackList";

import Button from "react-bootstrap/Button";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";

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
      <Container className="Playlist mb-5">
        <Container className="mb-3 mx-0 px-0">
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
          <Button
            size="lg"
            className="mb-5 mt-3 ml-3"
            onClick={this.props.onSave}
            style={{ backgroundColor: "rgb(126, 2, 214)", border: "none" }}
          >
            Create and save to Spotify
          </Button>
        </Container>
      </Container>
    );
  }
}

export default PlaylistAdd;
