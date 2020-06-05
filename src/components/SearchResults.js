import React, { Component } from 'react';
import TrackList from './TrackList';

import CardDeck from 'react-bootstrap/CardDeck';

class SearchResults extends Component {
  render() {
    return (
      <div>
        <h2>Results</h2>
       <CardDeck>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} />
        </CardDeck>
      </div>
    );
  }
}

export default SearchResults;