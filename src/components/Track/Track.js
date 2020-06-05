import React, { Component } from 'react';
// import './Track.css';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: new Audio(''),
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
    console.log('Play music');
    this.setState({ audio: new Audio(this.props.track.preview) }, () => {
      this.state.audio.play();
    });
  }

  pauseMusic() {
    this.state.audio.pause();
    this.setState({ audio: new Audio('') });
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <button className="Track-action" onClick={this.removeTrack}>
          -
        </button>
      );
    }
    return (
      <button className="Track-action" onClick={this.addTrack}>
        +
      </button>
    );
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          {/* <h3 style={{ fontSize: '1rem' }}>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p> */}
          {/* Cards */}
          <Col md={3}>
            <Card
              style={{ margin: '10px' }}
              onMouseOver={this.playMusic}
              onMouseOut={this.pauseMusic}
            >
              <Card.Img variant="top" src={this.props.track.img} />
              <Card.Body>
                <Card.Text>
                {this.props.track.name} | {this.props.track.artist}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <iframe
            src={'https://open.spotify.com/embed/track/' + this.props.track.id}
            width="300"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title="preview"
          />
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
