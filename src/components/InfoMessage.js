import React from "react";
import { Alert } from "react-bootstrap";

function ErrorMessage({ variant, message }) {
  return <Alert variant={variant}>{message}</Alert>;
}

export default ErrorMessage;
