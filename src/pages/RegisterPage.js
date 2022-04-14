import axios from "axios";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  let baseURL = `${process.env.REACT_APP_API_URL}`;

  let navigate = useNavigate();

  let registerUser = async (e) => {
    e.preventDefault();
    await axios
      .post(`${baseURL}/register/`, {
        headers: {
          "Content-Type": "application/json",
        },
        username: e.target.username.value,
        password: e.target.password.value,
        email: e.target.email.value,
      })
      .then((response) => {
        console.log("Success");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.email);
        }
      });
    navigate("/login");
  };

  return (
    <>
      <form onSubmit={registerUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Enter Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter a username"
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
          Register
        </Button>
      </form>
    </>
  );
}

export default RegisterPage;
