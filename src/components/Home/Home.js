import React, { Component } from 'react';
import './Home.css';
import hash from '../../hash';
import NewRelease from './NewRelease';

class Home extends Component {
  constructor() {
    super();
    this.state = {
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
    // let token = hash.access_token;

    fetch('https://api.spotify.com/v1/me/player/recently-played?limit=5', {
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
      <div className="container">
        {/* <h4>Recently played</h4> */}
        {this.state.musicHistory.map((music, index) => {
          return (
            <div key={index}>
              <div className="inner_container">
                <img
                  src={music.track.album.images[0].url}
                  alt="_image"
                  className="shape"
                />
              </div>
              <p>{music.track.name}</p>
              <p>{music.track.artists[0].name}</p>
              {/* <iframe
                src={'https://open.spotify.com/embed/track/' + music.track.id}
                width="150"
                height="80"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
                title="preview"
              /> */}
            </div>
          );
        })}
        <NewRelease />
      </div>
    );
  }
}
export default Home;
