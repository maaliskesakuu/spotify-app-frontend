import React from 'react';

const Footer = () => {
    return (
        <div style={{height: "120px", width:"100%", backgroundColor: "#0c0028", textAlign:"center", position:"fixed", bottom:"0"}}>
            <p style={{color:"white", paddingTop:"20px"}}>Data is being supplied and made available by Spotify</p>
            <a href="https://www.spotify.com"><img
            src="/Spotify_logo_RGB_White.png"
            alt="Spotify Logo"
            style={{ width: '8vw', cursor: "pointer" }}
          /></a>
        </div>
    );
}

export default Footer;