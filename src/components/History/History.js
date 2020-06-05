import React, { Component } from 'react';
import './History.css';
import hash from '../../hash';

class History extends Component {
  constructor() {
    super();
    this.state = {
      searchResults: [],
      token: null,
      musicHistory: [],
    };
    this.getRecentlyPlayed = this.getRecentlyPlayed.bind(this);
  }

  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token,
      });
      this.getRecentlyPlayed(_token);
    }
  }

  // fetching data of recently played songs
  getRecentlyPlayed = token => {
    fetch('https://api.spotify.com/v1/me/player/recently-played?limit=20', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => data.items)
      .then(data =>
        this.setState({
          musicHistory: data,
        })
      );
  };

  render() {
    return (
      <div>
        <h4>History</h4>
        <div className="_containerss">
          {this.state.musicHistory.map((music, index) => {
            return (
              <div key={index}>
                <iframe
                  // src="https://open.spotify.com/embed/playlist/37i9dQZF1DX9sIqqvKsjG8"
                  src={'https://open.spotify.com/embed/track/' + music.track.id}
                  width="300"
                  height="80"
                  // width="900"
                  // height="1000"
                  frameBorder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                  title="preview"
                />
                {/* <img src={music.track.album.images[2].url} alt="album cover" /> */}
                <div className="title">
                  {/* <p>
                    {music.track.name} | {music.track.artists[0].name}
                  </p> */}
                  <p>last played: {music.played_at}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default History;
