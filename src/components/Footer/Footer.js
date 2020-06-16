import React from 'react';

const Footer = () => {
    return (
        <div style={{height: "120px", width:"100%", backgroundColor: "#0c0028", textAlign:"center"}}>
            <p style={{color:"white", paddingTop:"20px", paddingLeft: "0.5rem", paddingRight: "0.5rem"}}>Data is being supplied and made available by Spotify</p>
            <a href="https://www.spotify.com"><img
            src="/Spotify_logo_RGB_White.png"
            alt="Spotify Logo"
            style={{ width: '8vw', cursor: "pointer" }}
          /></a>
        </div>
    );
}

export default Footer;