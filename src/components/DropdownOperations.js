import React from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function DropdownOperations({ id }) {
  const navigate = useNavigate();
  console.log(id);
  const handleEditClick = (e) => {
    e.preventDefault();
    navigate("/getProject/" + id);
    console.log(e.target.value);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select Action
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <form onSubmit={handleEditClick}>
          <Dropdown.Item as="button" onClick={(e) => handleEditClick}>
            Go in
          </Dropdown.Item>
        </form>
        <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownOperations;
