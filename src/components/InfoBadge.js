import React from "react";
import { Badge } from "react-bootstrap";
function InfoBadge({ variant, message }) {
  return <Badge bg={variant}>{message}</Badge>;
}

export default InfoBadge;
