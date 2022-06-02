import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import InfoMessage from "../components/InfoMessage";
import validator from "validator";

const LoginPage = () => {
  let { loginUser, user, message } = useContext(AuthContext);
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [validForm, setValidForm] = useState(false);

  const { state } = useLocation();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  });

  useEffect(() => {
    if (
      validator.isEmail(email) &&
      validator.isLength(password.trim(), { min: 6 }) &&
      password.length === password.replace(" ", "").length
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [email, password]);

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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          {...(validForm ? {} : { disabled: true })}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginPage;
