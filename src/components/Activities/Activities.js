import React, { Component } from 'react';
import TrackResults from '../TrackResults/TrackResults';

import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Button from 'react-bootstrap/Button';

// import hash from '../../hash';

// import SearchResults from '../SearchResults/SearchResults';

const activities = [
  {
    id: 1,
    activity: 'Study',
    category_id: 'focus',
  },
  {
    id: 2,
    activity: 'Work Out',
    category_id: 'workout',
  },
  {
    id: 3,
    activity: 'Sleep',
    category_id: 'sleep',
  },
  {
    id: 4,
    activity: 'Meditate',
    category_id: 'wellness',
  },
];

class Activities extends Component {
  state = { activities: activities };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     activities: activities,
  //     selectedCategory: '',
  //     searchResults: [],
  //   };

  //   this.activityButtonClicked = this.activityButtonClicked.bind(this);
  //   this.getMusic = this.getMusic.bind(this);
  // }

  // getMusic() {
  //   let token = hash.access_token;
  //   fetch(
  //     `https://api.spotify.com/v1/browse/categories/${this.props.category_id}/playlists?limit=2`, //API call to get playlists with category
  //     {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   )
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(jsonResponse => {
  //       if (!jsonResponse.playlists) {
  //         return [];
  //       }

  //       //Making array with playlist IDs
  //       var ID_array = [];
  //       jsonResponse.playlists.items.forEach(item => {
  //         ID_array.push(item.id);
  //       });
  //       console.log(ID_array);

  //       return ID_array;
  //     })
  //     .then(ID_array => {
  //       for (var i = 0; i < ID_array.length; i++) {
  //         fetch(
  //           `https://api.spotify.com/v1/playlists/${ID_array[i]}/tracks?limit=10`, //API call with playlists IDs to get tracks
  //           {
  //             headers: {
  //               Accept: 'application/json',
  //               'Content-Type': 'application/json',
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         )
  //           .then(response => {
  //             return response.json();
  //           })
  //           .then(jsonResponse => {
  //             if (!jsonResponse.items) {
  //               return [];
  //             }
  //             return jsonResponse.items.map(item => ({
  //               id: item.track.id,
  //               name: item.track.name,
  //               artist: item.track.artists[0].name,
  //               album: item.track.album.name,
  //               // uri: item.track.uri,
  //               preview: item.track.preview_url,
  //             }));
  //           })
  //           .then(searchResults => {
  //             this.setState({ searchResults: searchResults });
  //             console.log(searchResults);
  //           });
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error.data);
  //     });
  // }

  // activityButtonClicked(button) {
  //   this.setState({ selectedCategory: button.target.value }, () => {
  //     this.getMusic();
  //   });
  //   this.setState({ searchResults: [] }); //making tracks empty before making new api call
  // }

  render() {
    const activityList = this.state.activities.map(activity => {
      return (
        <TrackResults
          key={activity.id}
          activity={activity.activity}
          category_id={activity.category_id}
        />
        // <Button
        //   style={{ margin: "10px" }}
        //   onClick={ this.activityButtonClicked }
        //   value={activity.category_id}>
        //   {activity.activity}</Button>
      );
    });

    return (
      <div>
        <h2 style={{ color: 'black' }}>What you want to do?</h2>
        <Container>{activityList}</Container>
      </div>
    );
  }
}
export default Activities;
