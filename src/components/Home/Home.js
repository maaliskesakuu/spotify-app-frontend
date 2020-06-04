import React, { Component } from "react";
import "./Home.css";
import hash from "../../hash";
import NewRelease from "./NewRelease";

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
      // Set token
      this.setState({
        token: _token,
      });
      this.getRecentlyPlayed(_token);
    }
  }

  // fetching data of recently played songs
  getRecentlyPlayed = () => {
    //  const url = "https://api.spotify.com/v1/me/player/recently-played?limit=10";
    const tokens =
      "BQAQRc__7DmGV_DPvtRVvtp1vPwUdW6R9_S6uUFDgZR4pRUAmGz-U4xJ0RXqvhdUWjdHod4C9wtkF-F7vkBvQa4q3fFFX6RuzghmYmU2OEXcJVuvMwU_4_GxmK795ehUn_gPQGbct7aiWM7XSRDuryAQB2rjmdNHLxuPGoy8EBPO4IwYphD7Xjc";
    // Fetching the track/image name
    fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=5`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data.items)
      .then((data) =>
        this.setState({
          musicHistory: data,
        })
      );

    // refresh the song playing
    //setTimeout(() => this.getCurrentlyPlaying(tokens), 7500);
  };

  render() {
    return (
      <div>
        <h4>Recently played</h4>
        <div className="_container">
          {console.log(this.state.musicHistory)}
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
