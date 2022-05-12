import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import useAxios from "../utils/useAxios";

import { useNavigate } from "react-router-dom";
import { confirm } from "react-confirm-box";
import validator from "validator";

import InfoMessage from "../components/InfoMessage";

function ProfilePage() {
  const api = useAxios();
  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  let changePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords do not match");
    } else if (oldPassword.length < 6) {
      setErrorMessage("Old password is required");
    } else if (newPassword.length < 6 || confirmNewPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
    } else {
      const result = await confirm("Are you sure?");
      if (result) {
        if (newPassword !== confirmNewPassword) {
          setErrorMessage("Passwords do not match");
        } else {
          await api
            .put(`${process.env.REACT_APP_API_URL}/change-password/`, {
              old_password: oldPassword,
              new_password: newPassword,
              confirm_password: confirmNewPassword,
            })
            .then((response) => {
              if (response.data.status === "success") {
                setSuccessMessage("Password changed successfully");
              }
            })
            .catch((error) => {
              setErrorMessage(error.response.data.message);
            });
        }
      }
    }
  };

  let getProfile = async () => {
    let response = await api.get(
      `${process.env.REACT_APP_API_URL}/profiles/getProfile/`
    );
    if (response.status === 200) {
      setMail(response.data.email);
      setName(response.data.name ? response.data.name : "");
      setSurname(response.data.surname ? response.data.surname : "");
      setAge(response.data.age ? response.data.age : 18);
      setSex(response.data.sex ? response.data.sex : "Other");
      setPhoneNumber(
        response.data.phoneNumber ? response.data.phoneNumber : ""
      );
    }
  };

  const checkPhoneNumber = (number) => {
    if (
      validator.isMobilePhone(number) === true &&
      number.length >= 9 &&
      number.length <= 12
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkEmail = (email) => {
    if (validator.isEmail(email) === true) {
      return true;
    } else {
      return false;
    }
  };

  let updateProfile = async (e) => {
    e.preventDefault();
    if (
      parseInt(age) === 0 ||
      parseInt(age) > 100 ||
      parseInt(age) < 18 ||
      age === ""
    ) {
      setErrorMessage("Enter a Valid Age");
    } else if (name === "" || surname === "" || mail === "") {
      setErrorMessage("Enter a Name, Surname and Email");
    } else if (checkPhoneNumber(phoneNumber) === false) {
      setErrorMessage("Enter a Valid Phone Number");
    } else if (checkEmail(mail) === false) {
      setErrorMessage("Enter a Valid Email");
    } else if (!sex) {
      setErrorMessage("Please enter a gender");
    } else {
      navigate("/confirm", {
        state: {
          userEmail: mail,
          userName: name,
          userSurname: surname,
          userAge: age,
          userSex: sex,
          userPhoneNumber: phoneNumber,
        },
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      {errorMessage && <InfoMessage variant="danger" message={errorMessage} />}
      {successMessage && (
        <InfoMessage variant="success" message={successMessage} />
      )}
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Contact email address</Form.Label>
              <Form.Control
                type="email"
                name="userMail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                name="userPhone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="userSurname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="userAge"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Sex</Form.Label>
              <Form.Select
                aria-label="Select sex"
                onChange={(e) => setSex(e.target.value)}
                value={sex}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            updateProfile(e);
          }}
        >
          Submit
        </Button>
      </Form>
      <form onSubmit={changePassword}>
        <Form.Group className="mb-3" controlId="formOldPassword">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            name="oldPassword"
            placeholder="Password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="password1"
            placeholder="Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRepeatNewPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            name="password2"
            placeholder="Password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

export default ProfilePage;
