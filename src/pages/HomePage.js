import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import { Button, Dropdown, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { confirm } from "react-confirm-box";

const HomePage = () => {
  let api = useAxios();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const handleEditClick = (id) => {
    navigate("/getProject/" + id);
  };
  const handleDeleteClick = async (id) => {
    // e.preventDefault();
    const result = await confirm("Are you sure?");
    if (result) {
      api
        .delete(`${process.env.REACT_APP_API_URL}/projects/deleteProject/` + id)
        .then((res) => {
          getProjects();
          navigate("/");
        });
    }
  };

  const getProjects = async () => {
    await api
      .get(`${process.env.REACT_APP_API_URL}/projects/getProjects/`)
      .then((res) => {
        const data = res.data;
        setProjects(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.author}</td>
              <td>{project.status}</td>
              <td>{new Date(project.dateOfStart).toLocaleDateString()}</td>
              <td>{new Date(project.dateOfEnd).toLocaleDateString()}</td>
              <td>
                {project.isAuthor ? (
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Select Action
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        as="button"
                        onClick={(e) => handleEditClick(project.id)}
                      >
                        Go in
                      </Dropdown.Item>

                      <Dropdown.Item
                        as="button"
                        onClick={(e) => handleDeleteClick(project.id)}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Button onClick={(e) => handleEditClick(project.id)}>
                    Go in
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HomePage;
