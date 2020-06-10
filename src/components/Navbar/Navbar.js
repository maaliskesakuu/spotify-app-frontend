import React from 'react';
//import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import './Navbar.css';
import '../FontawesomeIcons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';

const NavBar = () => {
  //  const styles = {
  //    textDecoration: 'none',
  //  };

  return (
    <Navbar bg="light" variant="light" expand="md" className="px-3">
      <LinkContainer to="/#">
        <Navbar.Brand>
          <img
            src="/logoMusic.png"
            alt="app's logo"
            style={{ width: '8vw', cursor: "pointer" }}
          ></img>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav style={{cursor: "pointer"}}>
          <LinkContainer to="/">
            <NavItem className="mr-5">
              <FontAwesomeIcon icon="home"></FontAwesomeIcon> Home
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/playlist">
            <NavItem className="mr-5">
              <FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon> Create Playlist
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/featured">
            <NavItem className="mr-5">
              <FontAwesomeIcon icon="music"></FontAwesomeIcon> Recent and New
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/history">
            <NavItem className="mr-5">
              <FontAwesomeIcon icon="history"></FontAwesomeIcon> History
              Playlist
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/user">
            <NavItem className="mr-5">
              <FontAwesomeIcon icon="user"></FontAwesomeIcon> Profile
            </NavItem>
          </LinkContainer>
          <a href="//accounts.spotify.com/logout">Log out</a>
        </Nav>
      </Navbar.Collapse>
      {/* <div> 
      <a href="/"><img src="/logoMusic.png" alt="app's logo"></img></a>
      <ul>
        <Link to="/" style={styles}>
          Home
        </Link>
      </ul>
      <ul>
        <Link to="/history" style={styles}>
          History Playlist
        </Link>
      </ul>
      <ul>
        <Link to="/activities" style={styles}>
          Search Music and Create a Playlist
        </Link>
      </ul>
      <ul>
        <Link to="/playlist" style={styles}>
          Make a Collaborative Playlist
        </Link>
      </ul>
      </div>  */}
    </Navbar>
  );
};

export default NavBar;
