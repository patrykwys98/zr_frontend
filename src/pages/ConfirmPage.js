import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import useAxios from "../utils/useAxios";
function ConfirmPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  let api = useAxios();

  const confirmHandler = async () => {
    let response = await api.put(
      `${process.env.REACT_APP_API_URL}/profiles/updateProfile/update/`,
      {
        name: state.userName,
        surname: state.userSurname,
      }
    );
  };

  if (!state) {
    navigate("/");
  }
  return (
    <div>
      {state.userEmail}
      {state.userName}
      {state.userSurname}
      {state.userAge}
      {state.userSex}
      {state.userPhoneNumber}
      <Button onClick={confirmHandler}>Confirm</Button>
    </div>
  );
}

export default ConfirmPage;
