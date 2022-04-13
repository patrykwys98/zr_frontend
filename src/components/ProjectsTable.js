import { Table, DropdownButton, Dropdown } from "react-bootstrap";
import React from "react";
import ProjectRow from "../components/ProjectRow";
function ProjectsTable(props) {
  return (
    <div>
      {props.projects.map((project) => (
        <ProjectRow
          title={project.title}
          key={project.id}
          status={project.status}
          author={project.author}
          isAuthor={project.isAuthor}
          dateOfStart={project.dateOfStart}
          dateOfEnd={project.dateOfEnd}
          id={project.id}
        />
      ))}
    </div>
  );
}

export default ProjectsTable;
