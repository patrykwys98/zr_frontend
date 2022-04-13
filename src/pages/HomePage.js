import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { useLocation } from "react-router-dom";
import ProjectsTable from "../components/ProjectsTable";
const HomePage = () => {
  let api = useAxios();
  const { user, baseURL } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

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
      <ProjectsTable projects={projects} userId={user.id} />
    </>
  );
};

export default HomePage;
