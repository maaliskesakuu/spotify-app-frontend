import React, { Component } from "react";
import "./SearchBar.css";

import Button from "react-bootstrap/Button";

class SearchBar extends Component {

  state = { term: '' };

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      this.search();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter a keyword"
          onChange={this.handleTermChange.bind(this)}
          onKeyUp={this.handleEnter.bind(this)}
        ></input>
        <Button
          size="lg"
          style={{ backgroundColor: "rgb(126, 2, 214)", border: "none" }}
          className="mb-5"
          onClick={this.search.bind(this)}
        >
          Search
        </Button>
      </div>
    );
  }
}

export default SearchBar;
