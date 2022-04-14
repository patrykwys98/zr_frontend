import React from "react";
import { Card } from "react-bootstrap";
function CardTitleValue({ title, value }) {
  return (
    <>
      <Card style={{ marginTop: "10px" }}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{value}</Card.Text>
      </Card>
    </>
  );
}

export default CardTitleValue;
