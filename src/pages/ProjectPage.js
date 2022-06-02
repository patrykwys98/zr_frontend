import React, { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { useParams, useNavigate } from "react-router-dom";
import {
  ListGroup,
  Button,
  Card,
  Form,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import { confirm } from "react-confirm-box";
import InfoBadge from "../components/InfoBadge";
import InfoMessage from "../components/InfoMessage";

function EditProjectPage() {
  let api = useAxios();
  const navigate = useNavigate();

  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isCommentValid, setIsCommentValid] = useState(false);

  const getProject = async () => {
    let response = await api.get(
      `${process.env.REACT_APP_API_URL}/projects/getProject/${id}`
    );
    setProject(response.data);
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
          setErrorMessage(error.response.data.message);
        });
    }
    getProject();
    setComment("");
  };

  const handleUpdate = () => {
    navigate("/updateProject", { state: { project } });
  };

  useEffect(() => {
    getProject();
  }, []);

  useEffect(() => {
    setIsCommentValid(comment.trim().length > 0 ? true : false);
  }, [comment]);

  return (
    <>
      {errorMessage && <InfoMessage message={errorMessage} variant="primary" />}
      <ListGroup>
        <ListGroup.Item>
          <Row>
            <Col xs={3}>
              <h3>Status: {project.status}</h3>
            </Col>
            {project.isAuthor ? (
              <>
                <Col xs={8}>
                  <h3>Author: You are author</h3>
                </Col>

                <Col xs={1}>
                  <Button onClick={handleUpdate}>Update</Button>
                </Col>
              </>
            ) : (
              <Col xs={9}>
                <h3>Author: {project.author?.replaceAll("None", "")}</h3>
              </Col>
            )}
          </Row>
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <h3>Title: {project.title} </h3>
        </ListGroup.Item>
        <ListGroup.Item className="text-center">
          <h3>Description</h3>
          <Form.Control
            as="textarea"
            placeholder={project.description}
            aria-label="Disabled input example"
            disabled
            readOnly
            plaintext
            style={{ height: "200px" }}
          />
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <Row>
            <Col>
              <h3>Date of start</h3>
              {project.dateOfStart}
            </Col>
            <Col>
              <h3>Date of end</h3>
              {project.dateOfEnd}
            </Col>
          </Row>
        </ListGroup.Item>
        {project.usersNames && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>Name</td>
                <td>Surname</td>
                <td>Age</td>
                <td>Email</td>
                <td>Phone Number</td>
              </tr>
            </thead>
            <tbody>
              {project.usersNames?.map((user, i) => (
                <tr key={i}>
                  <td>{user?.name}</td>
                  <td>{user?.surname}</td>
                  <td>{user?.age}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <ListGroup.Item>
          <form onSubmit={addComment}>
            <Form.Group controlId="formComment">
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter comment"
                    value={comment}
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
                    <b>Author</b> - Added{" "}
                    {new Date(comment.createdAt).toLocaleString()}
                  </Card.Header>
                ) : (
                  <Card.Header>
                    {comment.isAuthor ? (
                      <b>Author</b>
                    ) : (
                      <b>{comment.author.replaceAll("None", "")}</b>
                    )}{" "}
                    - Added
                    {new Date(comment.createdAt).toLocaleString()}
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
