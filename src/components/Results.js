import React from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const Results = (props) => {
  return (
    <Col md={3}>
      <Card style={{ margin: "10px" }}>
        <Card.Img variant="top" src={props.image.url} />
        <Card.Body>
          <Card.Text>
            {props.artist} - {props.track}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Results;