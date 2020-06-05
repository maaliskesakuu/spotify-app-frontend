import React, { Component } from "react";
import './Track.css';

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
  }

  addTrack(event) {
    this.props.onAdd(this.props.track);
  }

  removeTrack(event) {
    this.props.onRemove(this.props.track);
  }
  playMusic() {
    console.log("Play music");
    if (this.props.track.preview) {
      this.setState({ audio: new Audio(this.props.track.preview) }, () => {
        this.state.audio.play();
      });
    } else {
      console.log("no preview");
    }
  }
  pauseMusic() {
    this.state.audio.pause();
    this.setState({ audio: new Audio("") });
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <Button className="Track-action" onClick={this.removeTrack}>
          -
        </Button>
      );
    }
    return (
      <Button
        className="Track-action"
        onClick={this.addTrack}
        style={{ marginLeft: "10px" }}
      >
        +
      </Button>
    );
  }

  render() {
    return (
      <Col md={3}>
        <Card style={{ margin: "10px" }}>
          {/*  <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p> */}

          {/* Cards */}

          <Card.Img
            variant="top"
            src={this.props.track.img}
            onMouseOver={this.playMusic}
            onMouseOut={this.pauseMusic}
          />
          <Card.Body>
            <Card.Text>
              {this.props.track.artist} - {this.props.track.track}
            </Card.Text>
          </Card.Body> 

           
          {/* <iframe
            src={"https://open.spotify.com/embed/track/" + this.props.track.id}
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