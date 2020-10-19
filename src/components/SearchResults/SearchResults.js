import React, { Component } from "react";
import TrackList from "../TrackList/TrackList";

import { CardDeck, Container } from "react-bootstrap";

class SearchResults extends Component {
  render() {
    return (
      <div>
        <Container>
          <CardDeck className="my-5 py-3 box">
            <TrackList
              tracks={this.props.searchResults}
              onAdd={this.props.onAdd}
              muted={this.props.muted}
            />
          </CardDeck>
        </Container>
      </div>
    );
  }
}

export default SearchResults;
