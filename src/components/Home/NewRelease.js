import React, { Component } from 'react';
import hash from '../../hash';
import './NewRelease.css';

class NewRelease extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      newRelease: [],
    };
    this.getNewRelease = this.getNewRelease.bind(this);
  }

  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token,
      });
      this.getNewRelease(_token);
    }
  }

  getNewRelease = token => {
    fetch('https://api.spotify.com/v1/browse/new-releases?limit=5', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => data.albums.items)
      .then(data =>
        this.setState({
          newRelease: data,
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h4>New</h4>
        <div className="contains">
          {this.state.newRelease.map((songs, index) => {
            return (
              <div key={index}>
                <div className="contain">
                  <div className="inner">
                    <img
                      src={songs.images[0].url}
                      alt="_images"
                      className="shapes"
                    />
                  </div>
                </div>
                <div className="titles">
                  <p>
                    {songs.name} | {songs.artists[0].name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default NewRelease;
