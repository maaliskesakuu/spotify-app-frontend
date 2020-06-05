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
    //this.playMusic = this.playMusic.bind(this);
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
      "BQBiFBtqNZhlgQR79LNVsN5V3vTBH6NjPVM_JwMZrqYr9jw2Z9LtsvhyExapH3pzZq7K2CNNwcK-WJugBpfkuMg5jlJ2tUm2Nprb9lG5AeAmWLXu7RzvIoccFN_D7c4Hzbc2Wlhq9jtBf0KncjhR8NVvqy499lGHip91YqifkUjshOlcIihjPC8";
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
          audio: data,
        })
      );

    // refresh the song playing
    //setTimeout(() => this.getCurrentlyPlaying(tokens), 7500);
  };

  //play music on hover
  // playMusic() {
  //   // console.log("Play music");
  //   this.setState({ audio: new Audio(this.props.audio) }, () => {
  //     this.state.audio.play();
  //   });
  // }

  handleMusic = () => {
    console.log("Play music");
    // this.playMusic();
  };

  render() {
    return (
      <div>
        {/* {this.state.audio} */}
        <h4>Recently played</h4>
        <div className="_container">
          {console.log(this.state.audio)}
          {console.log(this.state.musicHistory)}

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
