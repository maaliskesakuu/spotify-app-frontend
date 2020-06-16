import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import "./Navbar.css";
import "../FontawesomeIcons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Nav, NavItem, Navbar, NavDropdown } from "react-bootstrap";

const NavItems = props => {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item mr-3 mb-1">
      {/* eslint-disable-next-line */}
      <a id="icon-button" onClick={() => setOpen(!open)}>
        <p>
          My account <FontAwesomeIcon icon="caret-down" />
        </p>
      </a>
      {open && props.children}
    </li>
  );
};

const NavBar = () => {
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
          <LinkContainer to="/featured">
            <NavItem className="mr-3 mb-1 mr-5">
              <FontAwesomeIcon icon="music"></FontAwesomeIcon> Recent and New
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/history">
            <NavItem className="mr-3 mb-1 mr-5">
              <FontAwesomeIcon icon="history"></FontAwesomeIcon> History
              Playlist
            </NavItem>
          </LinkContainer>

          <NavItems>
            <div className="item_box">
              <LinkContainer to="/user">
                <NavItem className="mr-3 mb-1 mr-5">Profile</NavItem>
              </LinkContainer>
              <NavDropdown.Divider />
              <a
                href="//harmony-fbddf.web.app/"
                rel="noopener noreferrer"
                className="mr-3 mr-5 out"
              >
                Log out
              </a>
            </div>
          </NavItems>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

