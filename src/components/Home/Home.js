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
      audio: new Audio(''),
    };

    //this.playMusic = this.playMusic.bind(this);
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
          audio: data,
        })
      );
  };

  //play music on hover /Flo's
  // playMusic() {
  //   console.log('Play music');
  //   this.setState({ audio: new Audio(this.state.audio) }, () => {
  //     this.state.audio.play();
  //   });
  // }

  handleMusic = () => {
    console.log('Play music');
   // this.playMusic();
  };

  render() {
    return (
      <div>
        {/* {this.state.audio} */}
        <h4>Recently played</h4>
        <div className="_container">
          {this.state.musicHistory.map((music, index) => {
            return (
              <div key={index}>
                <div className="inner_container">
                  <img
                    src={music.track.album.images[0].url}
                    alt="_image"
                    className="shape"
                    onMouseOver={this.handleMusic}
                  />
                </div>
                <div className="titles">
                  <p>
                    {music.track.name} | {music.track.artists[0].name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <NewRelease />
      </div>
    );
  }
}
export default Home;
