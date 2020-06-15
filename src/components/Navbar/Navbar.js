import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import "./Navbar.css";
import "../FontawesomeIcons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import hash from "../../hash";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";

class NavBar extends Component {
  state = {
    token: hash.access_token,
  };

  render() {
    return (
      <Navbar
        variant="dark"
        expand="md"
        style={{
          backgroundColor: "#0c0028",
          paddingLeft: "0.6rem",
          marginRight: "0",
          paddingRight: "0.6rem",
        }}
      >
        <LinkContainer to="/#">
          <Navbar.Brand>
            <img
              src="/harmony.png"
              alt="app's logo"
              style={{ width: "9vw", cursor: "pointer", padding: "0" }}
            ></img>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav style={{ cursor: "pointer" }}>
            <LinkContainer to="/">
              <NavItem className="mr-3 mb-1">
                <FontAwesomeIcon icon="home"></FontAwesomeIcon> Home
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/playlist">
              <NavItem className="mr-3 mb-1">
                <FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon> Create
                Playlist
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/featured">
              <NavItem className="mr-3 mb-1">
                <FontAwesomeIcon icon="music"></FontAwesomeIcon> Recent and New
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/history">
              <NavItem className="mr-3 mb-1">
                <FontAwesomeIcon icon="history"></FontAwesomeIcon> History
                Playlist
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/user">
              <NavItem className="mr-3 mb-1">
                <FontAwesomeIcon icon="user"></FontAwesomeIcon> Profile
              </NavItem>
            </LinkContainer>
            <a
              href="//harmony-fbddf.web.app/"
              rel="noopener noreferrer"
              className="mr-3 mb-1"
              onClick={() => {
                this.setState({ token: null });
              }}
            >
              Log out
            </a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
