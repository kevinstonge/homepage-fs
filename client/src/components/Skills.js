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
      .get(`https://www.kevinstonge.com/api/portfolio/projects`)
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
          <div className="skills-table">
            <div className="row">
              <p>skill</p>
              <p>proficiency</p>
            </div>
            {skills.map((skill) => (
              <div className="row" key={`${skill.long_name}`}>
                <div className="img-name">
                  <img
                    src={`https://www.kevinstonge.com/images/${skill.logo}`}
                    alt={`${skill.long_name}`}
                  />
                  <p>{skill.long_name}</p>
                </div>
                <p>{proficiency[skill.proficiency]}</p>
              </div>
            ))}
          </div>
        </>
        // <table>
        //   <caption>Skills</caption>
        //   <thead>
        //     <tr>
        //       <th colSpan="2">skill</th>
        //       <th style={{ width: "100%" }}>proficiency</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {/* long_name, short_name, logo, proficiency */}
        //     {skills.map((skill) => (
        //       <tr key={`skill${skill.id}`}>
        //         <td className="img-container">
        //           <img
        //             src={`https://www.kevinstonge.com/images/${skill.logo}`}
        //             alt={`${skill.long_name}`}
        //           />
        //         </td>
        //         <td>
        //           <p>{skill.long_name}</p>
        //         </td>
        //         <td>{proficiency[skill.proficiency]}</td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
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
