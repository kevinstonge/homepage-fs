import axios from "axios";
import { useEffect, useState } from "react";
export default function Skills() {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/portfolio/skills`, {
        // withCredentials: true,   //todo: turn this on for production, check server.js cors/helmet settings
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk2MTY1NDF9.ZlzLz1AlK9inN24ZBFT4fT_ct0bRv4p3mNLCFoRGLyg",
        },
      })
      .then((r) => {
        setSkills(r.data.skills);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(skills);
  return (
    <>
      <h2>skills</h2>
      {skills?.length > 0 &&
        skills.map((skill) => {
          return (
            <div key={`skill-${skill.id}`}>
              <p>{skill.long_name}</p>
              <p>{skill.short_name}</p>
              <p>{skill.proficiency}</p>
              <p>{skill.logo}</p>
            </div>
          );
        })}
    </>
  );
}
