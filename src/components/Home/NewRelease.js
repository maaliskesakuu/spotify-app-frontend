import React, { Component } from "react";
import hash from "../../hash";

import Home from './Home';

import {
  Col,
  Card,
  CardDeck,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import * as constants from "../../constants/constants";

class NewRelease extends Component {

  state = {
    token: null,
    newRelease: [],
    tooltipText: "",
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
    fetch(constants.API + "browse/new-releases?limit=12", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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

  setText(text) {
    this.setState({ tooltipText: text });
  }

  getText() {
    return this.state.tooltipText;
  }

  //show tooltip
  renderTooltip(props) {
    return <Tooltip {...props}>Release date {this.getText()}</Tooltip>;
  }

  render() {
    return (
      <div>
        <h2 className="my-5 text_light" style={{ color: "white", textAlign: "center" }}>
          New releases
        </h2>
        <Container className="mb-5">
          <CardDeck className="box py-3">
            {this.state.newRelease.map((songs, index) => {
              return (
                <Col md={3} key={index}>
                  <Card
                    style={{ margin: "10px", boxShadow: "0 0 10px #333" }}
                    key={index}
                    onMouseOver={() => {
                      this.setText(songs.release_date);
                    }}
                  >
                    <OverlayTrigger
                      placement="bottom"
                      overlay={this.renderTooltip.bind(this)}
                    >
                      <Card.Img
                        src={songs.images[0].url}
                        alt="_images"
                        className="shapes"
                      />
                    </OverlayTrigger>
                    <Card.Body style={{ height: "6.5rem", padding: "10px", overflow: "scroll" }}>
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
        <Home />
      </div>
    );
  }
}

export default NewRelease;
