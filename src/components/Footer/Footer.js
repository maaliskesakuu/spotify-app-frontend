import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        height: "120px",
        width: "100%",
        backgroundColor: "rgb(42, 0, 70)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          color: "white",
          paddingTop: "20px",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
      >
        Data supplied and made available by Spotify
      </p>
      <a
        href="https://www.spotify.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/Spotify_Logo_RGB_White.png"
          alt="Spotify Logo"
          style={{ width: "8rem", cursor: "pointer" }}
        />
      </a>
    </div>
  );
};

export default Footer;
