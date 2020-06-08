import React, { Component } from 'react';
import hash from '../../hash';
// import './NewRelease.css';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

class NewRelease extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      newRelease: [],
      // audio: new Audio(''),
    };

    // this.playMusic = this.playMusic.bind(this);
    // this.pauseMusic = this.pauseMusic.bind(this);
    this.getNewRelease = this.getNewRelease.bind(this);
  }

  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token,
      });
      this.getNewRelease(_token);
    }
  }

  getNewRelease = token => {
    fetch('https://api.spotify.com/v1/browse/new-releases?limit=4', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => data.albums.items)
      .then(data =>
        this.setState({
          newRelease: data,
        })
      )
      .catch(err => console.log(err));
  };

  // //play music on hover
  // playMusic = preview => {
  //   console.log(preview);
  //   console.log('Play music');

  //   if (preview) {
  //     this.setState({ audio: new Audio() }, () => {
  //       this.state.audio.play();
  //       console.log(this.state.audio);
  //     });
  //   } else {
  //     console.log('no preview');
  //   }
  // };

  //pause music when mouse is out of card
  // pauseMusic = () => {
  //   this.state.audio.pause();
  //   this.setState({ audio: new Audio('') });
  // };

  render() {
    return (
      <div>
        <h4>New</h4>
        <CardDeck>
          {this.state.newRelease.map((songs, index) => {
            return (
              <Col md={3} key={index}>
                <Card style={{ margin: '10px' }} key={index}>
                  <Card.Img
                    src={songs.images[0].url}
                    alt="_images"
                    className="shapes"
                    // onMouseOver={() => this.playMusic(songs.preview_url)}
                    // onMouseOut={this.pauseMusic}
                  />
                  <Card.Body>
                    <Card.Text>
                      {songs.name} | {songs.artists[0].name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </CardDeck>
        {/* <div className="contains">
          {this.state.newRelease.map((songs, index) => {
            return (
              <div key={index}>
                <div className="contain">
                  <div className="inner">
                    <img
                      src={songs.images[0].url}
                      alt="_images"
                      className="shapes"
                      onMouseOver={() => this.playMusic(songs.preview_url)}
                      onMouseOut={this.pauseMusic}
                    />
                  </div>
                </div>
                <div className="titles">
                  <p>
                    {songs.name} - {songs.artists[0].name}
                  </p>
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    );
  }
}

export default NewRelease;
