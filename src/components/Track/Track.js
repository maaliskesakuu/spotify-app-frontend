import React, { Component } from "react";

import { Col, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import "../FontawesomeIcons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Track extends Component {
  state = {
    audio: new Audio(""),
    isPlaying: true,
  };

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
    if (window.innerWidth <= 1279) {
      return;
    }
    this.setState({ audio: new Audio(this.props.track.preview) }, async () => {
      try {
        await this.state.audio.play();
      } catch (err) {
        console.log(err);
      }
    });
  }

  playMusicOnTouch() {
    if (window.innerWidth > 1279) {
      return;
    }
    this.setState({ audio: new Audio(this.props.track.preview) }, async () => {
      try {
        await this.state.audio.play();
      } catch (err) {
        console.log(err);
      }
    });
  }

  pauseMusic() {
    if (window.innerWidth <= 1279) {
      return;
    }
    this.state.audio.pause();
    this.setState({ audio: new Audio("") });
  }

  pauseMusicOnTouch() {
    this.state.audio.pause();
    this.setState({ audio: new Audio("") });
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <Button
          onClick={this.removeTrack.bind(this)}
          style={{
            position: "absolute",
            right: "10px",
            bottom: "10px",
            backgroundColor: "#C40000",
            border: "none",
          }}
        >
          <FontAwesomeIcon icon="minus"></FontAwesomeIcon>
        </Button>
      );
    }

    return (
      <Button
        onClick={this.addTrack.bind(this)}
        style={{
          position: "absolute",
          right: "10px",
          bottom: "10px",
          backgroundColor: "rgb(126, 2, 214)",
          border: "none",
        }}
      >
        <FontAwesomeIcon icon="plus"></FontAwesomeIcon>
      </Button>
    );
  }

  render() {
    return (
      <Col md={3}>
        <Card style={{ margin: "10px", boxShadow: "0 0 10px #333" }}>
          {/* Cards */}
          {/* Conditional tooltips */}
          {!this.props.track.preview ? (
            <OverlayTrigger
              placement="bottom"
              overlay={this.renderTooltip.bind(this)}
            >
              <Card.Img variant="top" src={this.props.track.img} />
            </OverlayTrigger>
          ) : (
            <Card.Img
              variant="top"
              src={this.props.track.img}
              onMouseOver={this.playMusic.bind(this)}
              onMouseOut={this.pauseMusic.bind(this)}
              onTouchStart={this.playMusicOnTouch.bind(this)}
              onTouchEnd={this.pauseMusicOnTouch.bind(this)}
            />
          )}
          <Card.Body
            style={{ height: "6.5rem", padding: "10px", overflow: "scroll" }}
          >
            <Card.Text>
              {this.props.track.name} | {this.props.track.artist}
            </Card.Text>
            {this.renderAction()}
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Track;
