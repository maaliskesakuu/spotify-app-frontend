import React, { Component } from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

import CardDeck from 'react-bootstrap/CardDeck';

class SearchResults extends Component {
  render() {
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Results</h2>
        <CardDeck className="my-5">
          <TrackList
            tracks={this.props.searchResults}
            onAdd={this.props.onAdd}
          />
        </CardDeck>
      </div>
    );
  }
}

export default SearchResults;
