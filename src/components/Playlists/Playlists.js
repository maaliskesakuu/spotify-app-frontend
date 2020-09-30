import React, { Component } from "react";
import hash from "../../hash";

import { Col, Card, CardDeck, Container } from "react-bootstrap";

import * as constants from "../../constants/constants";

class Home extends Component {
  state = {
    token: null,
    playlists: [],
  };

  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token,
      });
      this.getPlaylists(_token);
    }
  }

  getPlaylists = token => {
    fetch(constants.API + "me/playlists", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => data.items)
      //   .then(data => {
      //     if (!data.items) {
      //       return [];
      //     }
      //     return data.items.map(item => ({
      //       id: item.id,
      //       name: item.name,
      //       img: item.images,
      //       description: item.description,
      //       owner: item.user,
      //     }));
      //   })
      .then(data =>
        this.setState({
          playlists: data,
        })
      )
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Container className="mb-5">
          <h2
            className="my-5 text_light"
            style={{ color: "white", textAlign: "center" }}
          >
            My Playlists
          </h2>
          <CardDeck className="box py-3">
            {console.log(this.state.playlists)}
            {this.state.playlists.map((playlist, index) => {
              return (
                <Col md={3} key={index}>
                  <Card
                    style={{ margin: "10px", boxShadow: "0 0 10px #333" }}
                    key={index}
                  >
                    <Card.Body
                      style={{
                        height: "30rem",
                        padding: "10px",
                        overflow: "scroll",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src="/Spotify_Logo_RGB_White.png"
                        style={{
                          backgroundColor: "#0c0028",
                          padding: "0.5rem",
                          marginBottom: "10px",
                        }}
                      ></Card.Img>
                      <div>
                        <strong>Name: </strong>
                        {playlist.name} {<hr />} <strong>Description: </strong>
                        {playlist.description} {<hr />} <strong>Owner: </strong>
                        {playlist.owner.display_name} {<hr />}
                        <strong>Total number of tracks: </strong>
                        {playlist.tracks.total} {<hr />}
                        <strong>Playlist: </strong>
                        <a
                          href={playlist.external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Go to the playlist in Spotify
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </CardDeck>
        </Container>
      </div>
    );
  }
}
export default Home;
