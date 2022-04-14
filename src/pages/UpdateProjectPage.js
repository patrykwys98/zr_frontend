import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MultiSelect from "react-multiple-select-dropdown-lite";
import useAxios from "../utils/useAxios";
import { Form, Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { confirm } from "react-confirm-box";
function UpdateProjectPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const api = useAxios();

  const [options, setOptions] = useState([]);

  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const getProfiles = async () => {
    let response = await api.get(
      `${process.env.REACT_APP_API_URL}/profiles/getProfiles/`
    );
    setOptions(response.data);
  };

  const updateProject = async () => {
    await api.put(`${process.env.REACT_APP_API_URL}/projects/updateProject/`, {
      id: state.project.id,
      title: title,
      description: description,
      users: users.split(","),
      dateOfStart: startDate,
      dateOfEnd: endDate,
      status: status,
    });
  };

  useEffect(() => {
    getProfiles();
    setTitle(state.project.title);
    setDescription(state.project.description);
    setStatus(state.project.status);
  }, []);

  const handleUsers = (val) => {
    setUsers(val);
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>Title</Form.Label>
      <Form.Control
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Form.Label>Description</Form.Label>
      <Form.Control
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Form.Label>Status</Form.Label>
      <Form.Control
        type="text"
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <DateTimePicker
        onChange={setStartDate}
        value={startDate}
        format="y-MM-dd"
      />
      <DateTimePicker onChange={setEndDate} value={endDate} format="y-MM-dd" />

      <Button
        variant="primary"
        type="submit"
        onClick={async () => {
          const result = await confirm("Are you sure ?");
          if (result) {
            updateProject();
            navigate(-1);
          }
        }}
      >
        Update
      </Button>
      <MultiSelect onChange={handleUsers} options={options} />
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
    </Form.Group>
  );
}

export default UpdateProjectPage;
