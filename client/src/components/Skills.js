import { useState, useEffect } from "react";
import axios from "axios";
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
      .get(`${process.env.REACT_APP_API}/api/portfolio/projects`)
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
          {projects.length > 0 &&
            projects.map((project, id) => (
              <p key={`${project.title}-${id}`}>{project.title}</p>
            ))}
        </>
      )}
      {status !== null && <p>{status}</p>}
    </>
  );
}
export default Skills;
