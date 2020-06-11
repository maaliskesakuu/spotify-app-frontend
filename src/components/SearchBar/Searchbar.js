import React, { Component } from 'react';
import './SearchBar.css';

import Button from 'react-bootstrap/Button';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

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
      <div className="SearchBar mt-5">
        <input
          placeholder="Enter a keyword"
          onChange={this.handleTermChange}
          onKeyUp={this.handleEnter}
        ></input>
        <Button variant="warning" onClick={this.search}>
          Search
        </Button>
      </div>
    );
  }
}

export default SearchBar;
