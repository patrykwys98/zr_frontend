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

  useEffect(() => {
    getProfile();
  }, []);

  let getProfile = async () => {
    let response = await api.get(
      `${process.env.REACT_APP_API_URL}/api/profile/`
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
    </>
  );
}

export default ProfilePage;
