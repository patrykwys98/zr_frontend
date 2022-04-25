import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import useAxios from "../utils/useAxios";
import CardTitleValue from "../components/CardTitleValue";

function ConfirmPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  let api = useAxios();

  const confirmHandler = async () => {
    let response = await api.put(
      `${process.env.REACT_APP_API_URL}/profiles/updateProfile/`,
      {
        name: state.userName,
        surname: state.userSurname,
        email: state.userEmail,
        phoneNumber: state.userPhoneNumber,
        sex: state.userSex,
        age: state.userAge,
      }
    );
    navigate(-1);
  };

  if (!state) {
    navigate(-1);
  }
  return (
    <>
      <CardTitleValue title="Email" value={state.userEmail} />
      <CardTitleValue title="Name" value={state.userName} />
      <CardTitleValue title="Surname" value={state.userSurname} />
      <CardTitleValue title="Phone Number" value={state.userPhoneNumber} />
      <CardTitleValue title="Sex" value={state.userSex} />
      <CardTitleValue title="Age" value={state.userAge} />

      <Button onClick={confirmHandler}>Confirm</Button>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Go Home Page
      </Button>
    </>
  );
}

export default ConfirmPage;
