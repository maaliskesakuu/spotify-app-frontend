import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import "./Navbar.css";
import "../FontawesomeIcons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";

const NavBar = () => {
  return (
    <Navbar
      variant="dark"
      expand="md"
      style={{ backgroundColor: "rgb(42, 0, 70)", paddingRight: "0.6rem" }}
      sticky="top"
    >
      <LinkContainer to="/#">
        <Navbar.Brand>
          <img
            src="/harmony.png"
            alt="app's logo"
            style={{ width: "9vw", cursor: "pointer" }}
          ></img>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav style={{ cursor: "pointer" }}>
          <LinkContainer to="/">
            <NavItem className="mr-5 mb-1">
              <FontAwesomeIcon icon="home"></FontAwesomeIcon> Home
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/playlist">
            <NavItem className="mr-5 mb-1">
              <FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon> Create
              Playlist
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/featured">
            <NavItem className="mr-5 mb-1">
              <FontAwesomeIcon icon="music"></FontAwesomeIcon> Recent and New
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/history">
            <NavItem className="mr-5 mb-1">
              <FontAwesomeIcon icon="history"></FontAwesomeIcon> History
              Playlist
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/user">
            <NavItem className="mr-5 mb-1">
              <FontAwesomeIcon icon="user"></FontAwesomeIcon> Profile
            </NavItem>
          </LinkContainer>
          <a href="//accounts.spotify.com">Log out</a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
