import React, { Component } from 'react';
// import './Home.css';
import NewRelease from './NewRelease';
import hash from '../../hash';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import * as constants from '../../constants/constants';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      musicHistory: [],
      audio: new Audio(''),
    };

    this.playMusic = this.playMusic.bind(this);
    this.pauseMusic = this.pauseMusic.bind(this);
    this.getRecentlyPlayed = this.getRecentlyPlayed.bind(this);
  }

  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token,
      });
      this.getRecentlyPlayed(_token);
    }
  }

  // fetching data of recently played songs
  getRecentlyPlayed = token => {
    fetch(constants.API + 'me/player/recently-played?limit=4', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => data.items)
      .then(data =>
        this.setState({
          musicHistory: data,
        })
      ).catch(error => {
        console.log(error);
      });
  };

  //play music on hover
  playMusic = preview => {
    if (preview) {
      this.setState({ audio: new Audio(preview) }, () => {
        this.state.audio.play();
      });
    } else {
      console.log('no preview');
    }
  };

  //pause music when mouse is out of card
  pauseMusic = () => {
    this.state.audio.pause();
    this.setState({ audio: new Audio('') });
  };

  render() {
    return (
      <div>
        <h4>Recently played</h4>
        <CardDeck>
          {this.state.musicHistory.map((music, index) => {
            return (
              <Col md={3} key={index}>
                <Card style={{ margin: '10px' }} key={index}>
                  <Card.Img
                    src={music.track.album.images[0].url}
                    alt="_image"
                    onMouseOver={() => this.playMusic(music.track.preview_url)}
                    onMouseOut={this.pauseMusic}
                  />
                  <Card.Body>
                    <Card.Text>
                      {music.track.name} | {music.track.artists[0].name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </CardDeck>
        {/* <div className="_container">
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
        </div> */}
        <NewRelease />
      </div>
    );
  }
}
export default Home;
