import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  let { loginUser, user } = useContext(AuthContext);
  let navigate = useNavigate();
  if (user) {
    navigate("/");
  }
  return (
    <form onSubmit={loginUser}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="username" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default LoginPage;
