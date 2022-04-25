import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import InfoBadge from "../components/InfoBadge";
import ErrorMessage from "../components/ErrorMessage";

function RegisterPage() {
  let baseURL = `${process.env.REACT_APP_API_URL}`;

  const [errorMessage, setErrorMessage] = useState();
  const [mail, setMail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isValidMail, setIsValidMail] = useState(false);
  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

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
        if (response.status === 201) {
          navigate("/login");
          alert("Your account has been registered");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data.email) {
            setErrorMessage(error.response.data.email);
          } else if (error.response.data.username) {
            setErrorMessage(error.response.data.username);
          }
        }
      });
  };

  useEffect(() => {
    setIsValidMail(validator.isEmail(mail));
  }, [mail]);

  useEffect(() => {
    setIsValidPassword(validator.isLength(password, { min: 6 }));
  }, [password]);

  useEffect(() => {
    setIsValidUserName(
      validator.isAlphanumeric(userName) &&
        validator.isLength(userName, { min: 4 })
    );
  }, [userName]);

  useEffect(() => {
    setIsFormValid(isValidMail && isValidPassword && isValidUserName);
  }, [isValidMail, isValidPassword, isValidUserName]);

  return (
    <>
      {errorMessage && <ErrorMessage message={errorMessage} variant="danger" />}
      <form onSubmit={registerUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Email address{" "}
            {!isValidMail && (
              <InfoBadge variant="danger" message="Email address is invalid" />
            )}
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>
            Enter Username{" "}
            {!isValidUserName && (
              <InfoBadge
                variant="danger"
                message="Please enter a valid username"
              />
            )}
          </Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter a username"
            value={userName}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Password{" "}
            {!isValidPassword && (
              <InfoBadge variant="danger" message="Password is too short" />
            )}
          </Form.Label>
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

        <Button variant="primary" type="submit" disabled={!isFormValid}>
          Register
        </Button>
      </form>
    </>
  );
}

export default RegisterPage;
