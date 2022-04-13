import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MultiSelect from "react-multiple-select-dropdown-lite";
import useAxios from "../utils/useAxios";
import { Form, Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
function UpdateProjectPage() {
  const { state } = useLocation();
  const api = useAxios();
  const [values, setValues] = useState();
  const [options, setOptions] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  let getProfiles = async () => {
    let response = await api.get(
      `${process.env.REACT_APP_API_URL}/profiles/getProfiles/`
    );
    console.log(response.data);
    setOptions(response.data);
  };

  const updateProject = async () => {
    const users = [];
    if (values) {
      const users = values.split(",");
    } else {
      const users = [];
    }
    await api.put(`${process.env.REACT_APP_API_URL}/projects/updateProject/`, {
      id: state.project.id,
      title: title,
      description: description,
      users: users,
      dateOfStart: startDate,
      dateOfEnd: endDate,
    });
  };

  useEffect(() => {
    getProfiles();
    setTitle(state.project.title);
    setDescription(state.project.description);
  }, []);

  const handleOnchange = (val) => {
    setValues(val);
    console.log(JSON.stringify(val));
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>Title</Form.Label>
      <Form.Control
        type="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Form.Label>Description</Form.Label>
      <Form.Control
        type="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
        onClick={() => {
          updateProject();
        }}
      >
        Update
      </Button>
      <MultiSelect onChange={handleOnchange} options={options} />
    </Form.Group>
  );
}

export default UpdateProjectPage;
