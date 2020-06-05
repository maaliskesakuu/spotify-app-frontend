import React, { Component } from 'react';
import Track from '../Track/Track';

class TrackList extends Component {
  render() {
    return (
      <>
        {this.props.tracks.map(track => {
          return (
            <Track
              track={track}
              key={track.id}
              onAdd={this.props.onAdd}
              isRemoval={this.props.isRemoval}
              onRemove={this.props.onRemove}
            />
          );
        })}
      </>
    );
  }
}

export default TrackList;
