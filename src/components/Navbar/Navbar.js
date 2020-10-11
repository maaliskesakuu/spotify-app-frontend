import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import "./Navbar.css";
import "../FontawesomeIcons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Nav, NavItem, Navbar, Dropdown, NavLink } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar
      variant="dark"
      expand="md"
      style={{
        backgroundColor: "#0c0028",
        paddingLeft: "1rem",
        marginRight: "0",
        paddingRight: "1rem",
        
      }}
    >
      <LinkContainer to="/#">
        <Navbar.Brand>
          <img
            src="/harmonySmall.png"
            alt="app's logo"
            style={{ width: "9vw", cursor: "pointer", padding: "0" }}
          ></img>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav style={{ cursor: "pointer", padding: "1.5rem 0" }}>
          <LinkContainer to="/">
            <NavItem className="mr-3 mb-1 mr-5">
              <FontAwesomeIcon icon="home"></FontAwesomeIcon> Home
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/playlist">
            <NavItem className="mr-3 mb-1 mr-5">
              <FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon> Create
              Playlist
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/playlists">
            <NavItem className="mr-3 mb-1 mr-5">
              <FontAwesomeIcon icon="list"></FontAwesomeIcon> Playlists
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/featured">
            <NavItem className="mr-3 mb-1 mr-5">
              <FontAwesomeIcon icon="music"></FontAwesomeIcon> New and Recent
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/history">
            <NavItem className="mr-3 mb-1 mr-5">
              <FontAwesomeIcon icon="history"></FontAwesomeIcon> History
              Playlist
            </NavItem>
          </LinkContainer>

          <Dropdown as={NavItem}>
            <Dropdown.Toggle
              as={NavLink}
              style={{
                color: "white",
                paddingTop: "0",
                paddingRight: "50px",
              }}
            >
              My Account
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <LinkContainer to="/user">
                <Dropdown.Item> Profile</Dropdown.Item>
              </LinkContainer>
              <Dropdown.Item href="//accounts.spotify.com/">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
