import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const styles = {
    textDecoration: "none",
  };
  return (
    <div>
      <ul>
        <Link to="/home" style={styles}>
          Home
        </Link>
      </ul>
      <ul>
        <Link to="/history" style={styles}>
          History playlist
        </Link>
      </ul>
      <ul>
        <Link to="/playlist" style={styles}>
          Create Playlist
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
