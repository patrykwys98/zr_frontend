import React from "react";
import DropdownOperations from "./DropdownOperations";
import { Button } from "react-bootstrap";


function ProjectRow({
  title,
  id,
  author,
  status,
  dateOfStart,
  dateOfEnd,
  isAuthor,
}) {
  return (
    <>
      <tr key={id}>
        <td>{title}</td>
        <td>{author}</td>
        <td>{status}</td>
        <td>{new Date(dateOfStart).toLocaleString()}</td>
        <td>{new Date(dateOfEnd).toLocaleString()}</td>
        <td>
          {isAuthor ? <DropdownOperations id={id} /> : <Button> Go in</Button>}
        </td>
      </tr>
    </>
  );
}

export default ProjectRow;
