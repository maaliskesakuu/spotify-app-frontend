import React, { Component } from 'react';
import './CreatePlaylist.css';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CreatePlaylist extends Component {
  closePopup = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className="overlay">
        <Container>
          <Col md={{ span: 8, offset: 2 }} className="popup ">
            <Form className="mx-5 px-5">
              <Form.Group className="mt-3">
                <Form.Label>Create new playlist</Form.Label>
                <Form.Control type="text" placeholder="example name" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="example description"
                ></Form.Control>
              </Form.Group>
              <Button variant="success" className="mb-3">
                create
              </Button>
            </Form>
            <Button variant="light" id="closePopup" onClick={this.closePopup}>
              X
            </Button>
          </Col>
        </Container>
      </div>
    );
  }
}

export default CreatePlaylist;
