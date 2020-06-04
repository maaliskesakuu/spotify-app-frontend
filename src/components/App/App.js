import React, { Component } from "react";
//import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "../../config";
import hash from "../../hash";
//import Player from "./Player";
import "./App.css";
import Navbar from "../Navbar/Navbar";

class App extends Component {
  // testing to show what is being played
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }],
        },
        name: "",
        artists: [{ name: "" }],
      },
      is_playing: "Paused",
    };
    this.getRecentlyPlayed = this.getRecentlyPlayed.bind(this);
  }
  // testing to show what is being played ends here

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
      this.getRecentlyPlayed(_token);
    }
  }

  // testing to show what is being played
  getRecentlyPlayed(token) {
    //const url = `https://api.spotify.com/v1/me/player/recently-played?limit=10`;
    //console.log(url);
    // const tokens =
    //   "BQDXhJPcgQrEZpCbwJSwihZWuKiRzReVnx6gn78kb0JalmBk_zPm4B44xQq6Vj6WlJnEs30_cKKlZ3WobWAQqCJY-iYK04ER4hQlNtYwvT5DeYQ76NrlKaiFRbUVf5L0q7FXGeylOlfLhEJOiecIVGcCZo4Nq1rJY8oXj-rwe6Q5";
    // Make a call using the token
    // fetch(url, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${tokens}`,
    //   },
    // beforeSend: (xhr) => {
    //   xhr.setRequestHeader("Authorization", "Bearer " + tokens);
    // },
    // success: (data) => {
    // this.setState({
    //   item: data.item,
    //   is_playing: data.is_playing,
    // });
    // },
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .then((data) => data.item)
    //   .catch((error) => console.log(error));
    // refresh the song playing
    //setTimeout(() => this.getCurrentlyPlaying(tokens), 7500);
  }
  // testing to show what is being played ends here

  render() {
    return (
      <div>
        <header>
          {!this.state.token && (
            // this is the call to the Spotify Account Service
            <div className="container">
              <a
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                  "%20"
                )}&response_type=token&show_dialog=true`}
              >
                Login to Spotify
              </a>
            </div>
          )}

          {this.state.token && (
            // When you have a token show this
            <Navbar item={this.state.item} is_playing={this.state.is_playing} />
            // <Player item={this.state.item} is_playing={this.state.is_playing} />
          )}
        </header>
      </div>
    );
  }
}

export default App;
