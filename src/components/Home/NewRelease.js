import React, { Component } from "react";
import hash from "../../hash";
import "./NewRelease.css";

class NewRelease extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      newRelease: [],
    };
    this.getNewRelease = this.getNewRelease.bind(this);
  }
  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
      this.getNewRelease(_token);
    }
  }

  // fetching data of recently played songs
  getNewRelease = () => {
    //  const url = "https://api.spotify.com/v1/me/player/recently-played?limit=10";
    const tokens =
      "BQBXOUBFowPTuLRNPkMPpXt7JCRHSnEJkMtFQ7cozMk2wg6qlnnjZ3bAi0YRWbi2cHZv3QleFdVsPyHikNnivlZoXgIzoPL_Wek-UqqQKwE3TRhNMk-cE9GrbNKTCjbPIHYxfMoj6GZimoj1pnx6yaKbDP-K4tzuIdnNOS4W_g-Nt06tpil8nJM";
    fetch(`https://api.spotify.com/v1/browse/new-releases?limit=5`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data.albums.items)
      .then((data) =>
        this.setState({
          newRelease: data,
        })
      );

    // refresh the song playing
    //setTimeout(() => this.getCurrentlyPlaying(tokens), 7500);
  };

  render() {
    return (
      <div>
        <h4>New</h4>
        <div className="contains">
          {console.log(this.state.newRelease)}
          {this.state.newRelease.map((songs, index) => {
            return (
              <div key={index}>
                <div className="contain">
                  <div className="inner">
                    <img
                      src={songs.images[0].url}
                      alt="_images"
                      className="shapes"
                    />
                  </div>
                </div>
                <div className="titles">
                  <p>
                    {songs.name} | {songs.artists[0].name}
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

export default NewRelease;
