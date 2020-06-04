import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

//for getting token:
import hash from "../hash";

import SearchResults from "./SearchResults";

const activities = [
  {
    id: 1,
    activity: "Study",
    category_id: "focus",
  },
  {
    id: 2,
    activity: "Work Out",
    category_id: "workout",
  },
  {
    id: 3,
    activity: "Sleep",
    category_id: "sleep",
  },
  {
    id: 4,
    activity: "Meditate",
    category_id: "wellness",
  },
];

class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: activities,
      selectedCategory: "",
      track: [],
    };

    this.activityButtonClicked = this.activityButtonClicked.bind(this);
    this.getMusic = this.getMusic.bind(this);
  }

  getMusic() {
    let token = hash.access_token;
    fetch(
      `https://api.spotify.com/v1/browse/categories/${this.state.selectedCategory}/playlists?limit=2`, //API call to get playlists by selected category
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
                  id: item.track.id,
                  track: item.track.name,
                  artist: item.track.artists[0].name,
                  album: item.track.album.name,
                  preview: item.track.preview_url,
                  img: item.track.album.images[0].url,
                };
              });
              console.log(mappedTracks);

              this.setState({ track: this.state.track.concat(mappedTracks) }); //concat to join results from each api call. Is it working correctly?
              console.log(this.state.track);
            });
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
  }

  activityButtonClicked(button) {
    this.setState({ track: [] }); //Making tracks empty before making new api call
    this.setState({ selectedCategory: button.target.value }, () => {
      this.getMusic();
    });
  }

  render() {
    const activityList = this.state.activities.map((activity) => {
      return (
        <Button
          style={{ margin: "10px" }}
          onClick={this.activityButtonClicked}
          value={activity.category_id}
        >
          {activity.activity}
        </Button>
      );
    });

    return (
      <Container>
        <h2>What you want to do?</h2>
        <Row>{activityList}</Row>
        <SearchResults searchResults={this.state.track} />
      </Container>
    );
  }
}
export default Activities;
