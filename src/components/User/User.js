import React, { Component } from "react";
import hash from "../../hash";
import "./User.css";

import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";

import * as constants from "../../constants/constants";

class User extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      userId: "",
      displayName: "",
      followers: "",
      country: "",
      spotifyUrl: "",
      email: "",
      product: "",
      type: "",
    };
    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token,
      });
      this.getUserData(_token);
    }
  }

  // fetching user data
  getUserData = token => {
    fetch(constants.API + "me/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        this.setState({
          userId: jsonResponse.id,
          displayName: jsonResponse.display_name,
          followers: jsonResponse.followers.total,
          country: jsonResponse.country,
          spotifyUrl: jsonResponse.external_urls.spotify,
          email: jsonResponse.email,
          product: jsonResponse.product,
          type: jsonResponse.type,
        });
      });
  };

  render() {
    return (
      <div
        style={{ paddingRight: "0", paddingLeft: "0" }}
        className="mb-5 container"
      >
        <h2 className="my-5 head">{this.state.displayName}'s profile</h2>
        <div className="box">
          <Col
            md={{ span: 8, offset: 2 }}
            sm={{ span: 12 }}
            lg={{ span: 8, offset: 2 }}
            className="px-sm-0"
            style={{ paddingRight: "0", paddingLeft: "0" }}
          >
            <Table responsive hover striped className="my-5 mx-sm-0 px-sm-0 px-xs-0">
              <tbody>
                <tr style={{padding: "0.75rem 0.6rem"}}>
                  <th style={{padding: "0.75rem 0.6rem"}}>Display name</th>
                </tr>
                <tr style={{padding: "0.75rem 0.6rem"}}>
                  <td style={{padding: "0.75rem 0.6rem"}}>{this.state.displayName}</td>
                </tr>
                <tr style={{padding: "0.75rem 0.6rem"}}>
                  <th style={{padding: "0.75rem 0.6rem"}}>Email</th>
                </tr>
                <tr style={{padding: "0.75rem 0.6rem"}}>
                  <td style={{padding: "0.75rem 0.6rem"}}>{this.state.email}</td>
                </tr>
                <tr style={{padding: "0.75rem 0.6rem"}}>
                  <th style={{padding: "0.75rem 0.6rem"}}>Country</th>
                </tr>
                <tr style={{padding: "0.75rem 0.6rem"}}>
                  <td style={{padding: "0.75rem 0.6rem"}}>{this.state.country}</td>
                </tr>
                <tr>
                  <th style={{padding: "0.75rem 0.6rem"}}>User id</th>
                </tr>
                <tr>
                  <td style={{padding: "0.75rem 0.6rem"}}>{this.state.userId}</td>
                </tr>
                <tr>
                  <th style={{padding: "0.75rem 0.6rem"}}>Followers</th>
                </tr>
                <tr>
                  <td style={{padding: "0.75rem 0.6rem"}}>{this.state.followers}</td>
                </tr>
                <tr>
                  <th style={{padding: "0.75rem 0.6rem"}}>Spotify URI</th>
                </tr>
                <tr>
                  <td style={{padding: "0.75rem 0.6rem"}}>
                    {" "}
                    <a
                      href={this.state.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {this.state.spotifyUrl}
                    </a>
                  </td>
                </tr>
                <tr style={{padding: "0.75rem 0.6rem"}}>
                  <th style={{padding: "0.75rem 0.6rem"}}>Subscription level</th>
                </tr>
                <tr>
                  <td style={{padding: "0.75rem 0.6rem"}}>{this.state.product}</td>
                </tr>
                <tr>
                  <th style={{padding: "0.75rem 0.6rem"}}>Type</th>
                </tr>
                <tr>
                  <td style={{padding: "0.75rem 0.6rem"}}>{this.state.type}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </div>
      </div>
    );
  }
}

export default User;
