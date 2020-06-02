import React, { useEffect, useState } from "react";

//for getting token:
import hash from "../hash";

import Button from "react-bootstrap/Button";

const TrackResults = (props) => {
  const [track, setTrack] = useState([]);

  let token = hash.access_token;

  const getMusic = async () => {
    fetch(
      `https://api.spotify.com/v1/browse/categories/${props.category_id}/playlists?limit=2`, //API call to get playlists with category
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.playlists) {
          return [];
        }

        //Making array with playlist IDs
        var ID_array = [];
        jsonResponse.playlists.items.forEach((item) => {
          ID_array.push(item.id);
        });
        console.log(ID_array);

        return ID_array;
      })
      .then((ID_array) => {
        for (var i = 0; i < ID_array.length; i++) {
          fetch(
            `https://api.spotify.com/v1/playlists/${ID_array[i]}/tracks?limit=10`, //API call with playlists IDs to get tracks
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((responseInJson) => {
              console.log(responseInJson);
              var mappedTracks = responseInJson.items.map((item) => {
                return {
                  //Now showing only track name and artist. Modify this.
                  name: item.track.name,
                  artist: item.track.artists[0].name,
                };
              });
              console.log(mappedTracks);
              setTrack(mappedTracks);
            });
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  const tracklist = track.map((item) => {
    //Now showing only track name and artist. Modify this.
    return (
      <div>
        {item.name} - {item.artist}
      </div>
    );
  });
  return (
    <div>
      <Button style={{ margin: "10px" }} onClick={getMusic}>
        {props.activity}
      </Button>
      {tracklist}
    </div>
  );
};

export default TrackResults;
