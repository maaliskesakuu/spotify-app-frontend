import React, { useEffect, useState } from "react";

import axios from "axios";
import Results from "./Results";

import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";

const ActivityButton = (props) => {
  const [music, setMusic] = useState([]);

  //API call. Where to make it? In Results?
  const getMusic = async () => {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${props.value}&type=track&market=FI&limit=10`,
      //What should "type" be? (required) Options are album, artist, playlist, track, show and episode.
      //What should market be? (optional)
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer" +
            " ", //add the token here
            //How to pass the users token?
        },
      }
    );
    const data = await response.json();
    setMusic(data.tracks.items);
    console.log(data.tracks.items);
  };


  const resultList = music.map((track) => {
    return (
      <Results
        artist={track.artists[0].name}
        track={track.name}
        image={track.album.images[0]}
      />
    );
  });

  return (
    <div>
      <Button style={{ margin: "10px" }} onClick={getMusic}>
        {props.activity}
      </Button>
      <CardDeck>{resultList}</CardDeck>
    </div>
  );
};

export default ActivityButton;