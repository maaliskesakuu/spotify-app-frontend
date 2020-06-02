import React, { Component } from 'react';
import TrackResults from '../TrackResults/TrackResults';

import Container from 'react-bootstrap/Container';

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
    activity: 'Wellness',
    category_id: 'wellness',
  },
];

class Activities extends Component {
  state = { activities: activities };

  render() {
    const activityList = this.state.activities.map(activity => {
      return (
        <TrackResults
          key={activity.id}
          activity={activity.activity}
          category_id={activity.category_id}
        />
      );
    });

    return (
      <Container>
        <h2>What you want to do?</h2>
        {activityList}
      </Container>
    );
  }
}
export default Activities;
