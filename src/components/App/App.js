import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "../../config";
import hash from "../../hash";
import "./App.css";
import Routers from "../../Routers";
import Video from "../Video/snow.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../FontawesomeIcons/icons";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };
  }

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
      <>
        <div className="background">
          <header>
            {!this.state.token && (
              // this is the call to the Spotify Account Service
              <div id="container">
                <video autoPlay loop muted>
                  <source src={Video} type="Video/mp4" />
                </video>
                <h1>Welcome to</h1>
                <img src="/harmony.png" alt="logo" style={{ width: "120px" }} />
                <h2>We made your music life much easier.</h2>
                <div className="icon_wrap">
                  <FontAwesomeIcon icon="search" className="ico" />
                  <h3>Search</h3>
                  <p>music based on your activity</p>
                  <br />
                  <FontAwesomeIcon icon="mouse-pointer" className="ico" />
                  <h3>Hover</h3>
                  <p>to get a glimpse of your tracks</p>
                  <br />
                  <FontAwesomeIcon icon="plus" className="ico" />
                  <h3>Create</h3>
                  <p>your own library</p>
                </div>

                <button
                  id="btn"
                  style={{
                    border: "none",
                    backgroundColor: "rgb(42, 0, 70)",
                    borderRadius: "25px",
                    marginTop: "1.5rem",
                  }}
                >
                  <a
                    className="login"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                      "%20"
                    )}&response_type=token&show_dialog=true`}
                    style={{ color: "white" }}
                  >
                    Get started!
                  </a>
                </button>
              </div>
            )}
          </header>
        </div>
        <main>{this.state.token && <Routers />}</main>
      </>
    );
  }
}

export default App;
