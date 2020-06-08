import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "../../config";
import hash from "../../hash";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Video from "../Video/snow.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../FontawesomeIcons/icons";

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
    }
  }

  render() {
    return (
      <div>
        <div className="background">
          {!this.state.token && (
            // this is the call to the Spotify Account Service

            <div className="container">
              <video autoPlay loop muted>
                <source src={Video} type="Video/mp4" />
              </video>
              <h1>Welcome</h1>
              <img src="spotify.png" alt="logo" style={{ width: "100px" }} />
              <h2>We made your music life much easier</h2>
              <div className="icon_wrap">
                <FontAwesomeIcon icon="play" className="ico" />
                <h3>Play </h3>
                <p>music based on your activity</p>
                <br />
                <FontAwesomeIcon icon="mouse-pointer" className="ico" />
                <h3>Hover</h3>
                <p>to get a glimpse of your tracks</p>
                <br />
                <FontAwesomeIcon icon="plus" className="ico" />
                <h3>Add</h3>
                <p> tracks to your library</p>
              </div>
              <br />

              <button className="btn">
                <a
                  className="login"
                  href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                    "%20"
                  )}&response_type=token&show_dialog=true`}
                >
                  Get started!
                </a>
              </button>
            </div>
          )}
        </div>
        {this.state.token && (
          // When you have a token show this
          <Navbar item={this.state.item} is_playing={this.state.is_playing} />
          // <Player item={this.state.item} is_playing={this.state.is_playing} />
        )}
      </div>
    );
  }
}

export default App;
