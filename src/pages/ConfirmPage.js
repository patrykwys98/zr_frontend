import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Row, Col, ButtonGroup } from "react-bootstrap";
import useAxios from "../utils/useAxios";
import CardTitleValue from "../components/CardTitleValue";

function ConfirmPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  let api = useAxios();

  const confirmHandler = async () => {
    await api.put(`${process.env.REACT_APP_API_URL}/profiles/updateProfile/`, {
      name: state.userName,
      surname: state.userSurname,
      email: state.userEmail,
      phoneNumber: state.userPhoneNumber,
      sex: state.userSex,
      age: parseInt(state.userAge),
    });
    navigate(-1);
  };

  if (!state) {
    navigate(-1);
  }
  return (
    <>
      <Row>
        <Col>
          <CardTitleValue title="Email" value={state.userEmail} />
        </Col>
        <Col>
          <CardTitleValue title="Phone Number" value={state.userPhoneNumber} />
        </Col>
      </Row>

      <Row>
        <Col>
          <CardTitleValue title="Name" value={state.userName} />
        </Col>
        <Col>
          <CardTitleValue title="Surname" value={state.userSurname} />
        </Col>
      </Row>

      <Row>
        <Col>
          <CardTitleValue title="Sex" value={state.userSex} />
        </Col>
        <Col>
          <CardTitleValue title="Age" value={state.userAge} />
        </Col>
      </Row>
      <ButtonGroup className="d-flex m-2">
        <Button className="m-1" onClick={confirmHandler}>
          Confirm
        </Button>
        <Button
          className="m-1"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
        <Button
          className="m-1"
          onClick={() => {
            navigate("/");
          }}
        >
          Go Home Page
        </Button>
      </ButtonGroup>
    </>
  );
}

export default ConfirmPage;
