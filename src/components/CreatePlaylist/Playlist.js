import React, { Component } from 'react';
import './Playlist.css';

import hash from '../../hash';

import * as constants from '../../constants/constants';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      playlistName: 'New Playlist',
      playlistDescription: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  // to handle the title and description of a new playlist
  handleNameChange(event) {
    this.setState({ playlistName: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ playlistDescription: event.target.value });
  }

  //create an empty, collaborative playlist
  savePlaylist(e) {
    e.preventDefault();
    
    let accessToken = hash.access_token;
    let userId;
    let playlist = this.state.playlistName;
    let playlistDesc = this.state.playlistDescription;
    //get userId
    fetch(constants.API + 'me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
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
            description: playlistDesc,
            collaborative: true,
            public: 'false',
          }),
        })
          .then(() => {
            alert('Created a new playlist and saved it to Spotify');
            this.setState({
              playlistName: 'New Playlist',
              playlistDescription: '',
            });
          })
          .catch(error => {
            console.log(error);
          });
      });
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 className="my-5">Want to make a playlist with friends?</h2>
        <p>
          Is there a party coming and you want to make a playlist with your
          friends? <br />
          Make a collaborative playlist and share its Spotify URI with them so
          that they can add their favorite tracks, too!
        </p>
        <Container>
          <Col md={{ span: 8 }} className="popup">
            <Form className="mx-5 px-lg-5 px-xl-5">
              <Form.Group className="mt-3">
                <Form.Label>Create a collaborative playlist</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={this.handleNameChange}
                  value={this.state.playlistName}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="description"
                  placeholder="Enter a description"
                  value={this.state.playlistDescription}
                  onChange={this.handleDescriptionChange}
                ></Form.Control>
              </Form.Group>
              <Button
                variant="success"
                className="mb-3"
                onClick={this.savePlaylist}
              >
                Save to Spotify
              </Button>
            </Form>
          </Col>
        </Container>
      </div>
    );
  }
}

export default Playlist;
