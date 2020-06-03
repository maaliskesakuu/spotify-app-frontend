import React, { Component } from "react";
import ActivityButton from "./ActivityButton";

import Container from "react-bootstrap/Container";

const activities = [
  {
    id: 1,
    activity: "Study",
    value: "study",
  },
  {
    id: 2,
    activity: "Work Out",
    value: "workout",
  },
  {
    id: 3,
    activity: "Sleep",
    value: "sleep",
  },
  {
    id: 4,
    activity: "Meditate",
    value: "meditate",
  },
];

class Activities extends Component {
  state = {
    activities: activities,
  };
  render() {
    const activityList = this.state.activities.map((activity) => {
      return (
        <ActivityButton
          key={activity.id}
          activity={activity.activity}
          value={activity.value}
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


