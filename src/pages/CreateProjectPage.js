import React, { useState, useEffect } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import useAxios from "../utils/useAxios";
import { Form, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { useNavigate } from "react-router-dom";
import InfoBadge from "../components/InfoBadge";

const CreateProjectPage = () => {
  const api = useAxios();
  const [values, setValues] = useState([]);
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [dateIsValid, setDateIsValid] = useState(true);
  const [titleIsValid, setTitleIsValid] = useState(true);
  const [descriptionIsValid, setDescriptionIsValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setTitleIsValid(title.length > 0 ? true : false);
  }, [title]);

  useEffect(() => {
    setDescriptionIsValid(description.length > 0 ? true : false);
  }, [description]);

  useEffect(() => {
    setDateIsValid(startDate < endDate ? true : false);
  }, [startDate, endDate]);

  useEffect(() => {
    setIsFormValid(titleIsValid && descriptionIsValid && dateIsValid);
  }, [titleIsValid, descriptionIsValid, dateIsValid]);

  const addProject = async () => {
    let response = await api.post(
      `${process.env.REACT_APP_API_URL}/projects/createProject/`,
      {
        title: title,
        description: description,
        users: values.toString().split(","),
        dateOfStart: startDate,
        dateOfEnd: endDate,
      }
    );
    navigate("/");
  };

  let getProfiles = async () => {
    let response = await api.get(
      `${process.env.REACT_APP_API_URL}/profiles/getProfiles/`
    );
    setOptions(response.data);
  };

  const handleOnchange = (val) => {
    setValues(val);
  };
  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>
          Title
          {!titleIsValid && (
            <InfoBadge
              variant="danger"
              message="Please enter a title for your project"
            />
          )}
        </Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Description
          {!descriptionIsValid && (
            <InfoBadge
              variant="danger"
              message="Please enter a description for your project"
            />
          )}
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Row>
        <Col>
          Start Date
          {!dateIsValid && (
            <InfoBadge
              variant="danger"
              message="End date must be after start date"
            />
          )}
          <DateTimePicker
            className="mt-2"
            onChange={setStartDate}
            value={startDate}
            format="y-MM-dd"
          />
        </Col>
        <Col>
          End Date
          {!dateIsValid && (
            <InfoBadge
              variant="danger"
              message="End date must be after start date"
            />
          )}
          <DateTimePicker
            className="mt-2"
            onChange={setEndDate}
            value={endDate}
            format="y-MM-dd"
          />
        </Col>
      </Row>
      <Row
        className="m-2"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <MultiSelect onChange={handleOnchange} options={options} />
      </Row>
      <Row>
        <ButtonGroup className="d-flex">
          <Button
            className="m-1"
            variant="primary"
            type="submit"
            disabled={!isFormValid}
            onClick={() => {
              addProject();
            }}
          >
            Add Project
          </Button>

          <Button
            className="m-1"
            variant="primary"
            type="submit"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </Button>
        </ButtonGroup>
      </Row>
    </>
  );
};

export default CreateProjectPage;
