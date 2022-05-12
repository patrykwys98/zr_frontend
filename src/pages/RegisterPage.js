import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import InfoMessage from "../components/InfoMessage";
import AuthContext from "../context/AuthContext";

function RegisterPage() {
  let baseURL = `${process.env.REACT_APP_API_URL}`;

  let { setMessage } = useContext(AuthContext);

  useEffect(() => {
    setMessage("");
  }, []);

  const [errorMessage, setErrorMessage] = useState();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  let registerUser = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(mail)) {
      setErrorMessage("Invalid email");
    } else if (!validator.isLength(password, { min: 6 })) {
      setErrorMessage("Password must be at least 6 characters long");
    } else {
      await axios
        .post(`${baseURL}/register/`, {
          headers: {
            "Content-Type": "application/json",
          },
          email: e.target.email.value,
          password: e.target.password.value,
        })
        .then((response) => {
          if (response.status === 201) {
            navigate("/login", {
              state: {
                accountCreated: true,
              },
            });
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.email) {
              setErrorMessage(error.response.data.email);
            }
          }
        });
    }
  };

  return (
    <>
      {errorMessage && <InfoMessage message={errorMessage} variant="danger" />}
      <form onSubmit={registerUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address </Form.Label>
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password </Form.Label>
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

        <Button variant="primary" type="submit">
          Register
        </Button>
      </form>
    </>
  );
}

export default RegisterPage;
