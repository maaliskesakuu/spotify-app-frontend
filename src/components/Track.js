import React, { Component } from "react";
//import './Track.css';

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: new Audio(""),
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.playMusic = this.playMusic.bind(this);
    this.pauseMusic = this.pauseMusic.bind(this);
    this.renderTooltip = this.renderTooltip.bind(this);
  }

  addTrack(event) {
    this.props.onAdd(this.props.track);
  }

  removeTrack(event) {
    this.props.onRemove(this.props.track);
  }

  renderTooltip(props) {
    return <Tooltip {...props}>Sorry, no preview</Tooltip>;
  }

  playMusic() {
    this.setState({ audio: new Audio(this.props.track.preview) }, () => {
      this.state.audio.play();
    });
  }

  pauseMusic() {
    this.state.audio.pause();
    this.setState({ audio: new Audio("") });
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <Button onClick={this.removeTrack} style={{ marginLeft: "10px" }}>
          -
        </Button>
      );
    }
    return (
      <Button onClick={this.addTrack} style={{ marginLeft: "10px" }}>
        +
      </Button>
    );
  }

  render() {
    return (
      <Col md={3}>
        <Card style={{ margin: "10px" }}>
          {/* Cards */}
          {/* Conditional tooltips */}
          {!this.props.track.preview ? (
            <OverlayTrigger placement="bottom" overlay={this.renderTooltip}>
              <Card.Img variant="top" src={this.props.track.img} />
            </OverlayTrigger>
          ) : (
            <Card.Img
              variant="top"
              src={this.props.track.img}
              onMouseOver={this.playMusic}
              onMouseOut={this.pauseMusic}
            />
          )}
          <Card.Body>
            <Card.Text>
              {this.props.track.track} - {this.props.track.artist}
            </Card.Text>
          </Card.Body>

          {/* <iframe
            src={'https://open.spotify.com/embed/track/' + this.props.track.id}
            width="300"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title="preview"
          /> */}
        </Card>
        {this.renderAction()}
      </Col>
    );
  }
}

export default Track;
