import { useState, useEffect } from "react";
import axios from "axios";
import "../style/Skills.scss";
function Skills() {
  const proficiency = {
    1: "beginner",
    2: "intermediate",
    3: "advanced",
    4: "expert"
  }
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState("... fetching data from server ...");
  useEffect(()=>{
    axios.get(`https://www.kevinstonge.com/api/portfolio/projects`).then(r=>{
      if (r.status === 200) {
        setProjects(r.data.projects);
        setSkills(r.data.skills);
        setStatus(null);
      }  
      else {
        console.log('error');
        setStatus('error getting data from server')
      }
    })
  },[])
  return (
    <>
      {skills.length > 0 &&
        <table>
        <caption>Skills</caption>
        <thead><tr><th>skill</th><th>proficiency</th></tr></thead>
        <tbody>
        {/* long_name, short_name, logo, proficiency */}
        {skills.map((skill, id) => (
          <tr key={`skill${skill.id}`}>
            <td>
              <img src={`https://www.kevinstonge.com/images/${skill.logo}`}/>
              <p>{skill.long_name}</p>
            </td>
            <td>{proficiency[skill.proficiency]}</td>
          </tr>
        ))}
        </tbody>
        </table>
      }
      {projects.length > 0 && 
        <>
        <h2>Projects</h2>
        {projects.length > 0 && projects.map((project, id) => (
          <p key={`${project.title}-${id}`}>{project.title}</p>
        ))}
        </>
     }
      {status !== null && <p>{status}</p>}
    </>
  );
}
export default Skills;
