import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { confirm } from "react-confirm-box";

const HomePage = () => {
  let api = useAxios();
  const navigate = useNavigate();
  const { user, baseURL } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

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
          console.log(res);
          getProjects();
          navigate("/");
        });
    }
  };

  const getProjects = async () => {
    await api
      .get(`${baseURL}/projects/getProjects/`)
      .then((res) => {
        const data = res.data;
        setProjects(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.title}</td>
            <td>{project.author}</td>
            <td>{project.status}</td>
            <td>{new Date(project.dateOfStart).toLocaleString()}</td>
            <td>{new Date(project.dateOfEnd).toLocaleString()}</td>
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
                <Button> Go in</Button>
              )}
            </td>
          </tr>
        ))}
      </div>
    </>
  );
};

export default HomePage;
