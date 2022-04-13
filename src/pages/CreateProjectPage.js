import React, { useState, useEffect } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import useAxios from "../utils/useAxios";
import { Form, Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";

const Example = () => {
  const api = useAxios();
  const [values, setValues] = useState();
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
  };

  let getProfiles = async () => {
    let response = await api.get(
      `${process.env.REACT_APP_API_URL}/profiles/getProfiles/`
    );
    console.log(response.data);
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <DateTimePicker
          onChange={setStartDate}
          value={startDate}
          format="y-MM-dd"
        />
        <DateTimePicker
          onChange={setEndDate}
          value={endDate}
          format="y-MM-dd"
        />
        <Form.Group className="mb-3">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            name="userSurname"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Project
        </Button>
      </form>

      <MultiSelect onChange={handleOnchange} options={options} />
    </>
  );
};

export default Example;
