import React, { Component } from "react";
// import './Track.css';

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

        <Button
         variant="warning"
          onClick={this.removeTrack}
          style={{
            position: 'absolute',
            right: '10px',
            bottom: '10px',
            backgroundColor: 'cadetblue',
            border: 'none',
          }}
        >
          -
        </Button>
      );
    }

    return (
      <Button
        onClick={this.addTrack}
        style={{
          position: 'absolute',
          right: '10px',
          bottom: '10px',
          backgroundColor: 'cadetblue',
          border: 'none',
        }}
      >
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
          <Card.Body style={{ minHeight: '7rem', padding: '10px' }}>

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
