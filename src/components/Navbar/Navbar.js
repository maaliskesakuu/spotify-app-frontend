import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const styles = {
    textDecoration: 'none',
  };

  return (
    <div>
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
        <Link to="/playlist" style={styles}>
          Playlist
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
