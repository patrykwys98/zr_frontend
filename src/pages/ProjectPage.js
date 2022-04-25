import React, { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { useParams, useNavigate } from "react-router-dom";
import { ListGroup, Button, Card, Form, Row, Col } from "react-bootstrap";
import { confirm } from "react-confirm-box";
import InfoBadge from "../components/InfoBadge";

function EditProjectPage() {
  let api = useAxios();
  const navigate = useNavigate();

  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [comment, setComment] = useState("");

  const [isCommentValid, setIsCommentValid] = useState(false);

  const getProject = async () => {
    let response = await api.get(
      `${process.env.REACT_APP_API_URL}/projects/getProject/${id}`
    );
    setProject(response.data);
  };

  const handleUpdate = () => {
    navigate("/updateProject", { state: { project } });
  };

  const addComment = async (e) => {
    e.preventDefault();
    const result = await confirm("Are you sure ?");
    if (result) {
      await api
        .post(`${process.env.REACT_APP_API_URL}/comments/addComment/`, {
          project_id: id,
          text: comment,
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
    setComment("");
    getProject();
  };

  useEffect(() => {
    getProject();
  }, []);

  useEffect(() => {
    setIsCommentValid(comment.length > 0 ? true : false);
  }, [comment]);

  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <Row>
            {project.isAuthor ? (
              <>
                <Col xs={11}>
                  <h3>Author: You are author</h3>
                </Col>
                <Col xs={1}>
                  <Button onClick={handleUpdate} block>
                    Update
                  </Button>
                </Col>
              </>
            ) : (
              <h3>{project.author}</h3>
            )}
          </Row>
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <h3>Title: {project.title} </h3>
        </ListGroup.Item>
        <ListGroup.Item className="text-center">
          <h3>Description</h3>
          {project.description}
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <Row>
            <Col>
              <h3>Date of start</h3>
              {new Date(project.dateOfStart).toLocaleDateString()}
            </Col>
            <Col>
              <h3>Date of end</h3>
              {new Date(project.dateOfEnd).toLocaleDateString()}
            </Col>
          </Row>
        </ListGroup.Item>
        {project.usersNames && (
          <ListGroup.Item className="text-center">
            <h3>Users</h3>
            {project.usersNames?.map((user) => (
              <p key={user}>{user}</p>
            ))}
          </ListGroup.Item>
        )}

        <ListGroup.Item>
          <Row>
            <Col>
              <h3>Project Status</h3>
            </Col>
            <Col>
              <h3>{project.status}</h3>
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <form onSubmit={addComment}>
            <Form.Group controlId="formComment">
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter comment"
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Col>
                <Col xs={3}>
                  {isCommentValid ? (
                    <Button type="submit">Add comment</Button>
                  ) : (
                    <InfoBadge
                      className="align-center"
                      message="Comment is empty"
                    />
                  )}
                </Col>
              </Row>
            </Form.Group>
          </form>
        </ListGroup.Item>

        {project.comments && (
          <ListGroup.Item>
            {project.comments?.map((comment, i) => (
              <Card key={i}>
                {comment.isAuthor ? (
                  <Card.Header className="bg-dark text-white">
                    <b>Author</b> - Added
                    {new Date(comment.createdAt).toLocaleString()}
                  </Card.Header>
                ) : (
                  <Card.Header>
                    {comment.isAuthor ? <b>Author</b> : <b>{comment.author}</b>}{" "}
                    - Added
                    {new Date(comment.createdAt).toLocalte()}
                  </Card.Header>
                )}

                <Card.Body>{comment.text}</Card.Body>
              </Card>
            ))}
          </ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
}

export default EditProjectPage;
