import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
function ProfilePage() {
  let [profile, setProfile] = useState([]);

  let api = useAxios();
  let navigate = useNavigate();

  let [mail, setMail] = useState("");
  let [name, setName] = useState("");
  let [surname, setSurname] = useState("");
  let [age, setAge] = useState(0);
  let [sex, setSex] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");

  let [oldPassword, setOldPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [confirmNewPassword, setConfirmNewPassword] = useState("");

  let [isValid, setIsValid] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  let changePassword = async (e) => {
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
    } else {
      let response = await api.put(
        `${process.env.REACT_APP_API_URL}/change-password/`,
        {
          old_password: oldPassword,
          new_password: newPassword,
        }
      );
      if (response.data.success) {
        navigate("/");
      } else {
        alert("Wrong password");
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
          type="text"
          name="userAge"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Sex</Form.Label>
        <Form.Control
          type="text"
          name="userSex"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          name="userPhone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        onClick={() => {
          updateProfile();
        }}
      >
        Submit
      </Button>
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
