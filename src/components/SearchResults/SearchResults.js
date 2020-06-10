import React, { Component } from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';

class SearchResults extends Component {
  render() {
    return (
      <div>
        <Container>
        {/* <h2>Results</h2> */}
        <CardDeck className="my-5">
          <TrackList
            tracks={this.props.searchResults}
            onAdd={this.props.onAdd}
          />
        </CardDeck>
        </Container>
      </div>
    );
  }
}

export default SearchResults;
