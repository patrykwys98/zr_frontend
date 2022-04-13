import React, { useEffect, useState, useContext } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";

function EditProjectPage() {
  let api = useAxios();

  const { id } = useParams();
  const [project, setProject] = useState({});
  const navigate = useNavigate();

  const getProject = async () => {
    let response = await api.get(
      `${process.env.REACT_APP_API_URL}/projects/getProject/${id}`
    );
    setProject(response.data);
  };

  const handleUpdate = () => {
    navigate("/updateProject", { state: { project } });
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <ListGroup variant="flush">
      <h3>Author</h3>
      {project.isAuthor ? (
        <ListGroup.Item>
          <h4>You are author</h4> <Button onClick={handleUpdate}>Update</Button>
        </ListGroup.Item>
      ) : (
        <ListGroup.Item>
          <h4>{project.author}</h4>
        </ListGroup.Item>
      )}

      <ListGroup.Item>
        <h3>Title</h3>
        {project.title}
      </ListGroup.Item>
      <ListGroup.Item>
        <h3>Description</h3>
        {project.description}
      </ListGroup.Item>
      <ListGroup.Item></ListGroup.Item>
      <ListGroup.Item>
        <h3>Date of start</h3>
        {new Date(project.dateOfStart).toLocaleString()}
      </ListGroup.Item>
      <ListGroup.Item>
        <h3>Date of end</h3>
        {new Date(project.dateOfEnd).toLocaleString()}
      </ListGroup.Item>
      <ListGroup.Item>
        <h3>Users</h3>
        {project.usersNames}
      </ListGroup.Item>
    </ListGroup>
  );
}

export default EditProjectPage;
