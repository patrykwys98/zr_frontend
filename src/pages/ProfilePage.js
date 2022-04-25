import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { confirm } from "react-confirm-box";
import validator from "validator";

import ErrorMessage from "../components/ErrorMessage";

function ProfilePage() {
  const [profile, setProfile] = useState([]);

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
  const [formValid, isFormValid] = useState(true);

  const [errorMessage, setErrorMessage] = useState();

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

  const checkForm = () => {
    if (
      parseInt(age) === 0 ||
      parseInt(age) > 120 ||
      parseInt(age) < 18 ||
      age === "" ||
      name === "" ||
      surname === "" ||
      mail === "" ||
      checkPhoneNumber(phoneNumber) !== true ||
      checkEmail(mail) !== true
    ) {
      isFormValid(false);
      setErrorMessage("Please fill all fields correctly");
    } else {
      isFormValid(true);
      setErrorMessage();
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    checkForm();
  }, [age, name, sex, surname, mail, phoneNumber]);

  let changePassword = async (e) => {
    e.preventDefault();
    const result = await confirm("Are you sure?");
    if (result) {
      if (newPassword !== confirmNewPassword) {
        alert("Passwords do not match");
      } else {
        await api
          .put(`${process.env.REACT_APP_API_URL}/change-password/`, {
            old_password: oldPassword,
            new_password: newPassword,
          })
          .then((response) => {
            if (response.data.status === "success") {
              alert("Password changed successfully");
              navigate("/");
            }
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    }
  };

  let getProfile = async () => {
    let response = await api.get(
      `${process.env.REACT_APP_API_URL}/profiles/getProfile/`
    );
    if (response.status === 200) {
      const profile = response.data;
      setProfile(profile);
      setMail(profile.email);
      setName(profile.name);
      setSurname(profile.surname);
      setAge(profile.age);
      setSex(profile.sex);
      setPhoneNumber(profile.phoneNumber);
    }
  };

  let updateProfile = () => {
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
  };
  return (
    <>
      {errorMessage && <ErrorMessage variant="danger" message={errorMessage} />}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="userMail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            name="userSurname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="userAge"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="number"
            name="userPhone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={!formValid}
          onClick={() => {
            updateProfile();
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
