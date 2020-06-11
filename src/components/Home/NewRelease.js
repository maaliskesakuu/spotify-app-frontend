import React, { Component } from 'react';
import hash from '../../hash';
// import './NewRelease.css';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import * as constants from '../../constants/constants';

class NewRelease extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      newRelease: [],
      // audio: new Audio(''),
      tooltipText: '',
    };

    // this.playMusic = this.playMusic.bind(this);
    // this.pauseMusic = this.pauseMusic.bind(this);
    this.getNewRelease = this.getNewRelease.bind(this);
    this.renderTooltip = this.renderTooltip.bind(this);
    this.setText = this.setText.bind(this);
    this.getText = this.getText.bind(this);
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
    fetch(constants.API + 'browse/new-releases?limit=10', {
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
  //   if (preview) {
  //     this.setState({ audio: new Audio() }, () => {
  //       this.state.audio.play();
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

  setText(text) {
    this.setState({ tooltipText: text });
  }

  getText() {
    return this.state.tooltipText;
  }

  //show tooltip
  renderTooltip(props) {
    return <Tooltip {...props}>Release date {this.getText()}</Tooltip>
  }

  render() {
    return (
      <div>
        <h2 className="my-5" style={{ textAlign: 'center' }}>
          New releases
        </h2>
        <Container>
          <CardDeck>
            {this.state.newRelease.map((songs, index) => {
              return (
                <Col md={3} key={index}>
                  {/* <Card style={{ margin: '10px' }} key={index}>
                    <Card.Img
                      src={songs.images[0].url}
                      alt="_images"
                      className="shapes"
                      onMouseOver={() => this.playMusic(songs.preview_url)}
                       onMouseOut={this.pauseMusic}
                    /> */}
                  <Card style={{ margin: '10px', boxShadow:"0 0 10px #333" }} key={index} onMouseOver={() => { this.setText(songs.release_date) }}>
                    <OverlayTrigger placement="bottom" overlay={this.renderTooltip}>
                      <Card.Img src={songs.images[0].url} alt="_images" className="shapes" />
                    </OverlayTrigger>
                    <Card.Body style={{ minHeight: '7rem', padding: '10px' }}>
                      <Card.Text>
                        {songs.name} | {songs.artists[0].name}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </CardDeck>
        </Container>
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
