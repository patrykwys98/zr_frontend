import React from "react";
import { Alert } from "react-bootstrap";

function InfoMessage({ variant, message }) {
  return (
    <Alert style={{ textAlign: "center" }} variant={variant}>
      {message}
    </Alert>
  );
}

export default InfoMessage;
