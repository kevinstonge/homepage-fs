import { axiosWithoutAuth } from "../api/axios.js";
import { useEffect, useState } from "react";
import ProjectForm from "./ProjectForm.js";
import {emptyProject} from "../accessories/emptyProject.js";
export default function Projects() {
  const [projectForm, setProjectForm] = useState({
    saved: [],
    local: [],
  });
  useEffect(() => {
    axiosWithoutAuth
      .get(`/api/portfolio/projects`)
      .then((r) => {
        const imagePath = `${process.env.REACT_APP_API}/images`;
        const newProject = emptyProject;
        setProjectForm({
          saved: [
            { ...newProject },
            ...r.data.projects.map((project) => {
              return {
                ...project,
                localImage:
                  project.image === null
                    ? `${imagePath}/defaultImage.png`
                    : `${imagePath}/${project.image}`,
              };
            }),
          ],
          local: [
            { ...newProject },
            ...r.data.projects.map((project) => {
              return {
                ...project,
                localImage:
                  project.image === null
                    ? `${imagePath}/defaultImage.png`
                    : `${imagePath}/${project.image}`,
              };
            }),
          ],
        });
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <h2>Projects</h2>
      {projectForm.local.length > 0 &&
        projectForm.local.map((project, index) => {
          return ProjectForm({ project, index, projectForm, setProjectForm });
        })}
      <p style={{ fontSize: "smaller" }}>*required</p>
    </>
  );
}
