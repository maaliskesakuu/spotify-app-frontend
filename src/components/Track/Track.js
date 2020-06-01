import React, { Component } from 'react';

class Track extends Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(event) {
    this.props.onAdd(this.props.track);
  }

  removeTrack(event) {
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return <button onClick={this.removeTrack}>-</button>;
    }
    return <button onClick={this.addTrack}>+</button>;
  }

  render() {
    return (
      <div>
        <div>
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
            {/* {this.props.track.description} | {this.props.track.owner}*/}
          </p>
          {/* <p>songs in total: {this.props.track.tracks}</p> */}
          <iframe
            src={'https://open.spotify.com/embed/track/' + this.props.track.id}
            // src={'https://open.spotify.com/embed/playlist/' + this.props.track.id}
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
