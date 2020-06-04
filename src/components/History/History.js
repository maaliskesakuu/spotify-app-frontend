import React, { Component } from "react";
import "./History.css";
import hash from "../../hash";

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
    fetch(`https://api.spotify.com/v1/me/player/recently-played`, {
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
        <div className="_containerss">
          {console.log(this.state.musicHistory)}

          {this.state.musicHistory.map((music, index) => {
            return (
              <div key={index}>
                {/* <iframe
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DX9sIqqvKsjG8"
                  width="900"
                  height="1000"
                  frameborder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                /> */}
                <iframe
                  src={
                    "https://open.spotify.com/embed/playlist/37i9dQZF1DX9sIqqvKsjG8"
                    // + music.track.album.images[0].url
                  }
                  alt="_images"
                  className="_shape"
                  width="400"
                  height="80"
                  frameBorder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                  title="preview"
                />
                <div className="title">
                  <p>
                    {music.track.name} | {music.track.artists[0].name}
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

export default History;
