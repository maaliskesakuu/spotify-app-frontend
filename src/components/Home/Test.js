import React from "react";
import { SpotifyApiContext } from "react-spotify-api";

const Test = () => {
  return (
    <SpotifyApiContext.Provider value={token}></SpotifyApiContext.Provider>
  );
};

export default Test;
