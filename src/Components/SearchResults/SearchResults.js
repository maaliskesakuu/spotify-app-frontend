import React from "react";
 
//mport "./SearchResults.css";
 
import Tracklist from "../Tracklist/Tracklist";
 
class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        
        <Tracklist tracks={this.props.searchResults} onAdd={this.props.onAdd} />
      </div>
    );
  }
}
 
export default SearchResults;
 