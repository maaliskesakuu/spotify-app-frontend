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
      <>
        {/* <div className="mx-3"> */}
          <Container>
          <h2 className="my-5" style={{ textAlign: 'center' }}>Want to make a playlist with friends?</h2>
          <img
            src="/heidi-fin-H4fYXZ1hyco-unsplash.jpg"
            alt="computer with Spotify"
            className="mb-5 mr-3"
            style={{ width: '18rem', borderRadius: '5px', float: "left" }}
          ></img>
          {/* Photo by Heidi Fin on Unsplash */}
          <p className="playlist-text">
            Is there a party coming and you would like to make a playlist for the party with your
            friends or family?
          </p>
          <p className="playlist-text">
            Make a collaborative playlist and share its Spotify URI with them so
            they can add their favorite tracks to it, too!
          </p>
          <p className="playlist-text">Making a playlist is easy. Go ahead and fill in the form below. You can give your playlist a name that you like or use the one that is in the form already and add a fitting description if you will.</p>
          </Container>
        {/* </div> */}
        <Container className="mb-3 mt-5" style={{ clear: "left" }}>
          <Col md={{ span: 8, offset: 2 }} className="popup">
            <Form className="mx-sm-0 mx-lg-5 mt-3 px-lg-5">
              <Form.Group className="mt-3">
                <Form.Label>Create a collaborative playlist</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  name="title"
                  onChange={this.handleNameChange}
                  value={this.state.playlistName}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  size="lg"
                  as="textarea"
                  rows="3"
                  name="description"
                  placeholder="Enter a description"
                  value={this.state.playlistDescription}
                  onChange={this.handleDescriptionChange}
                ></Form.Control>
              </Form.Group>
              <Button
                variant="warning"
                className="mb-3"
                onClick={this.savePlaylist}
                style={{
                  border: 'none',
                  // color: 'black',
                  // backgroundColor: 'white',
                }}
              >
                Create and save to Spotify
              </Button>
            </Form>
          </Col>
        </Container>
      </>
    );
  }
}

export default Playlist;
