import React, { useState, useEffect } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import useAxios from "../utils/useAxios";
import { Form, Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { useNavigate } from "react-router-dom";

const CreateProjectPage = () => {
  const api = useAxios();
  const [values, setValues] = useState();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const addProject = async () => {
    let response = await api.post(
      `${process.env.REACT_APP_API_URL}/projects/createProject/`,
      {
        title: title,
        description: description,
        users: values.split(","),
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
    console.log(JSON.stringify(val));
  };
  console.log(startDate);
  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      <form onSubmit={addProject}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          Start Date
          <DateTimePicker
            onChange={setStartDate}
            value={startDate}
            format="y-MM-dd h:mm"
          />
          End Date
          <DateTimePicker
            onChange={setEndDate}
            value={endDate}
            format="y-MM-dd h:mm"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <MultiSelect onChange={handleOnchange} options={options} />

        <Button variant="primary" type="submit">
          Add Project
        </Button>

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
      </form>
    </>
  );
};

export default CreateProjectPage;
