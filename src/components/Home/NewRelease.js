import React, { Component } from "react";
import hash from "../../hash";
import "./NewRelease.css";

class NewRelease extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      newRelease: [],
      // audio: new Audio(""),
    };
    // this.playMusic = this.playMusic.bind(this);
    // this.pauseMusic = this.pauseMusic.bind(this);
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

  // fetching data of  newly released songs
  getNewRelease = () => {
    //  const url = "https://api.spotify.com/v1/me/player/recently-played?limit=10";
    const tokens =
      "BQCzeBtnbsv2Iq4Col-TATs7ZDFvgez_IwuoljzKKgOhx7I8iBVZdm2ny8eb6aurf_35O4MU_OVnads0H5dXq93YpzJC_YY9BzMIRIjVtIAJzFnXf1Ss65sYZQkeOjshSUm2OB4L_PJ30940E7sTKrKwxFlepeFT2nKmd0VoEMbOhirDQU53Ot0";
    // Fetching the track/image name
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

  //play music on hover
  // playMusic = (preview) => {
  //   console.log(preview);
  //   console.log("Play music");
  //   if (preview) {
  //     this.setState({ audio: new Audio(preview) }, () => {
  //       this.state.audio.play();
  //     });
  //   } else {
  //     console.log("no preview");
  //   }
  // };
  // //pause music when mouse is out of card
  // pauseMusic = () => {
  //   this.state.audio.pause();
  //   this.setState({ audio: new Audio("") });
  // };

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
                      // onMouseOver={() =>
                      //   this.playMusic(songs.track.preview_url)
                      // }
                      // onMouseOut={this.pauseMusic}
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
