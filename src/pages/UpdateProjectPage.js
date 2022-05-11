import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import useAxios from "../utils/useAxios";
import { Form, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { confirm } from "react-confirm-box";
import InfoBadge from "../components/InfoBadge";
function UpdateProjectPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const api = useAxios();

  const [options, setOptions] = useState([]);

  const [users] = useState(state.project.users);
  const [title, setTitle] = useState(state.project.title);
  const [description, setDescription] = useState(state.project.description);
  const [status, setStatus] = useState(state.project.status);
  const [startDate, setStartDate] = useState(
    new Date(state.project.dateOfStart.split("/").reverse().join("/"))
  );

  const [endDate, setEndDate] = useState(
    new Date(state.project.dateOfEnd.split("/").reverse().join("/"))
  );

  const [dateIsValid, setDateIsValid] = useState(true);
  const [titleIsValid, setTitleIsValid] = useState(true);
  const [descriptionIsValid, setDescriptionIsValid] = useState(true);

  const [usersInProject, setUsersInProject] = useState([]);

  const getProfiles = async () => {
    let response = await api.get(
      `${process.env.REACT_APP_API_URL}/profiles/getProfiles/`
    );
    setOptions(response.data);
  };

  const updateProject = async () => {
    if (title.length === 0) {
      setTitleIsValid(false);
    } else if (description.length === 0) {
      setDescriptionIsValid(false);
    } else if (startDate > endDate || !startDate || !endDate) {
      setDateIsValid(false);
    } else {
      await api.put(
        `${process.env.REACT_APP_API_URL}/projects/updateProject/`,
        {
          id: state.project.id,
          title: title,
          description: description,
          users: usersInProject?.map((user) => parseInt(user.value)),
          dateOfStart: startDate.toLocaleDateString("en-CA"),
          dateOfEnd: endDate.toLocaleDateString("en-CA"),
          status: status,
        }
      );
      navigate(-1);
    }
  };

  useEffect(() => {
    getProfiles();
    console.log(startDate, endDate);
  }, []);

  useEffect(() => {
    setUsersInProject(
      options.filter((option) => {
        return users?.find((userId) => userId === parseInt(option.value));
      })
    );
  }, [users, options]);

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>
          Title{" "}
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
        <Row>
          <Col>
            <Form.Select
              className="m-2"
              size="sm"
              aria-label="Select status"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="New">New</option>
              <option value="In progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Col>
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
              format="dd-MM-y"
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
              format="dd-MM-y"
            />
          </Col>
        </Row>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <MultiSelect
            options={options}
            value={usersInProject}
            onChange={setUsersInProject}
            labelledBy="Select users"
          />
        </Row>
      </Form.Group>
      <Row>
        <ButtonGroup className="d-flex">
          <Button
            className="m-1"
            variant="primary"
            type="submit"
            onClick={async () => {
              const result = await confirm("Are you sure ?");
              if (result) {
                updateProject();
              }
            }}
          >
            Update
          </Button>

          <Button
            className="m-1"
            variant="primary"
            type="submit"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </ButtonGroup>
      </Row>
    </>
  );
}

export default UpdateProjectPage;
