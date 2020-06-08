import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "../FontawesomeIcons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const styles = {
    textDecoration: "none",
  };
  return (
    <div>
      <ul>
        <FontAwesomeIcon icon="home" />
        <Link to="/home" style={styles}>
          Home
        </Link>
      </ul>
      <ul>
        <FontAwesomeIcon icon="history" />
        <Link to="/history" style={styles}>
          History playlist
        </Link>
      </ul>
      <ul>
        <FontAwesomeIcon icon="plus-circle" />
        <Link to="/playlist" style={styles}>
          Create Playlist
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
