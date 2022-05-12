import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import InfoMessage from "../components/InfoMessage";
const LoginPage = () => {
  let { loginUser, user, message } = useContext(AuthContext);
  let navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  });

  return (
    <>
      {state?.accountCreated && (
        <InfoMessage
          message="Account created please log in"
          variant="primary"
        />
      )}
      {message && <InfoMessage variant="danger" message={message} />}
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
