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
      audio: new Audio(""),
    };
    this.playMusic = this.playMusic.bind(this);
    this.pauseMusic = this.pauseMusic.bind(this);
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
    //let tokens = hash.access_token;
    //  const url = "https://api.spotify.com/v1/me/player/recently-played?limit=10";
    const tokens =
      "BQCjIh44YgZpVfiSm3W137lzbYtnkQ8tqnHgiGNhRz_L2oA27O5Oo-VLAuIufqyN_ssDVIruhhHNHTUeDqiGCWnEpcrc-wgViu6w63aN_pP3y7gRXL9YO_u_tyLqR9uWfjkf1rKRJK7v0luWntUhVFZ5F1neEY79WLMcDjvbJ8q-KNXFbfQXjFc";
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

  //play music on hover
  playMusic = (preview) => {
    console.log(preview);
    console.log("Play music");
    if (preview) {
      this.setState({ audio: new Audio(preview) }, () => {
        this.state.audio.play();
      });
    } else {
      console.log("no preview");
    }
  };
  //pause music when mouse is out of card
  pauseMusic = () => {
    this.state.audio.pause();
    this.setState({ audio: new Audio("") });
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
                    onMouseOver={() => this.playMusic(music.track.preview_url)}
                    onMouseOut={this.pauseMusic}
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
