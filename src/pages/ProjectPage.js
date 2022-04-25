import React, { useEffect, useState, useContext } from "react";
import useAxios from "../utils/useAxios";
import { useParams, useNavigate } from "react-router-dom";
import { ListGroup, Button, Card, Form } from "react-bootstrap";
import { confirm } from "react-confirm-box";

function EditProjectPage() {
  let api = useAxios();

  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const getProject = async () => {
    let response = await api.get(
      `${process.env.REACT_APP_API_URL}/projects/getProject/${id}`
    );
    setProject(response.data);
    console.log(response.data);
  };

  const handleUpdate = () => {
    navigate("/updateProject", { state: { project } });
  };

  const addComment = async (e) => {
    e.preventDefault();
    const result = await confirm("Are you sure ?");
    if (result) {
      const response = await api.post(
        `${process.env.REACT_APP_API_URL}/comments/addComment/`,
        {
          project_id: id,
          text: comment,
        }
      );
    }
    setComment("");
    getProject();
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      <ListGroup variant="flush">
        <h3>Author</h3>
        {project.isAuthor ? (
          <ListGroup.Item>
            <h4>You are author</h4>{" "}
            <Button onClick={handleUpdate}>Update</Button>
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
          {new Date(project.dateOfStart).toLocaleDateString()}
        </ListGroup.Item>
        <ListGroup.Item>
          <h3>Date of end</h3>
          {new Date(project.dateOfEnd).toLocaleDateString()}
        </ListGroup.Item>
        <ListGroup.Item>
          <h3>Users</h3>
          {project.usersNames?.map((user) => (
            <p key={user}>{user}</p>
          ))}
        </ListGroup.Item>
        <ListGroup.Item>
          <h3>Project Status</h3>
          {project.status}
        </ListGroup.Item>
      </ListGroup>
      <h3>Comments</h3>

      <form onSubmit={addComment}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter comment"
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Add comment</Button>
      </form>
      {project.comments?.map((comment, i) => (
        <Card key={i}>
          {comment.isAuthor ? (
            <Card.Header className="bg-dark text-white">
              <b>Author</b> - Added
              {new Date(comment.createdAt).toLocaleString()}
            </Card.Header>
          ) : (
            <Card.Header>
              {comment.isAuthor ? <b>Author</b> : <b>{comment.author}</b>} -
              Added
              {new Date(comment.createdAt).toLocalte()}
            </Card.Header>
          )}

          <Card.Body>{comment.text}</Card.Body>
        </Card>
      ))}
    </>
  );
}

export default EditProjectPage;
