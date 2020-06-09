import React, { Component } from 'react';
import './Playlist.css';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  // close the popup window
  closePopup = () => {
    window.location.reload();
  };

  // to handle the title and description of a new playlist
  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  handleDescriptionChange(event) {
    this.props.onDescriptionChange(event.target.value);
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 className="my-5">Want to make a playlist with friends?</h2>
        <p>Is there a party coming and you want to make a playlist with your friends? <br />
        Make a collaborative playlist and share its Spotify URI with them so that they can add their favorite tracks, too!</p>
        <Container>
          <Col md={{ span: 8}} className="popup">
            <Form className="mx-5 px-lg-5 px-xl-5">
              <Form.Group className="mt-3">
                <Form.Label>Create a collaborative playlist</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={this.handleNameChange}
                  value={this.props.title}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="description"
                  placeholder="Enter a description"
                  value={this.props.description}
                  onChange={this.handleDescriptionChange}
                ></Form.Control>
              </Form.Group>
              <Button
                variant="success"
                className="mb-3"
                onClick={this.props.onSave}
              >
                Create and save to Spotify
              </Button>
            </Form>
            {/* <Button variant="light" id="closePopup" onClick={this.closePopup}>
              X
            </Button> */}
          </Col>
        </Container>
      </div>
    );
  }
}

export default Playlist;
