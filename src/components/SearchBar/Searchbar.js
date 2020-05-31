import React, { Component } from 'react';

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
      <div>
        <input
          placeholder="activity"
          onChange={this.handleTermChange}
          onKeyUp={this.handleEnter}
        ></input>
        <button onClick={this.search}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
