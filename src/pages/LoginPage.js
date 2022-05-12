import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
const LoginPage = () => {
  let { loginUser, user, message } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  });

  return (
    <>
      {message && <ErrorMessage variant="danger" message={message} />}
      <Form onSubmit={loginUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="username"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginPage;
