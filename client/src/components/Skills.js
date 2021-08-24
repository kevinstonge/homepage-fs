import { useState, useEffect } from "react";
import axios from "axios";
import api from "../lib/api.js";
import "../style/Skills.scss";
function Skills() {
  const proficiency = {
    1: "beginner",
    2: "intermediate",
    3: "advanced",
    4: "expert",
  };
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState("... fetching data from server ...");
  useEffect(() => {
    axios
      .get(`${api}/api/portfolio/projects`)
      .then((r) => {
        if (r.status === 200) {
          setProjects(r.data.projects);
          setSkills(r.data.skills);
          setStatus(null);
        } else {
          console.log("error");
          setStatus("error getting data from server");
        }
      });
  }, []);
  return (
    <>
      {skills.length > 0 && (
        <>
          <h2>My technical skills</h2>
          <div className="skills">
            {skills.map((skill) => (
              <div className="skillCard" key={`$skill_${skill.id}`}>
                <img
                  src={`https://www.kevinstonge.com/images/${skill.logo}`}
                  alt={`${skill.long_name}`}
                />
                <div className="name-prof">
                  <p className="skill-name">{skill.long_name}</p>
                  <p className="proficiency">
                    [{proficiency[skill.proficiency]}]
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {projects.length > 0 && (
        <>
          <h2>Projects</h2>
          <div className="projects">
            {projects.length > 0 &&
              projects.map((project, id) => (
                <div className="projectCard" key={`${project.title}-${id}`}>
                  <h3>{project.title}</h3>
                  <div className="cardContent">
                    <div className="left">
                      <img src={`https://www.kevinstonge.com/images/${project.image ? project.image : `defaultImage.png`}`} alt={project.title}/>
                    </div>
                    <div className="right">
                      <p><span className="label">desc</span>: {project.description}</p>
                      <p><span className="label">link</span>: <a href={project.url}>{project.url}</a></p>
                      <p><span className="label">repo</span>: <a href={project.github}>{project.github}</a></p>
                      <p><span className="label">skills</span>: 
                        {project.skills.length > 0 && 
                          skills.length > 0 && 
                          project.skills.map((projectSkill,index)=>{
                            return(
                              `${skills.filter(skill=>skill.id === projectSkill)[0].short_name}${index < project.skills.length - 1 ? `, ` : ``}
                              `
                            );
                          })
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </>
      )}
      {status !== null && <p>{status}</p>}
    </>
  );
}
export default Skills;
