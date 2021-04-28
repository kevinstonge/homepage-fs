import axios from "axios";
import { useEffect, useState } from "react";
export default function Skills() {
  const [skillForm, setSkillForm] = useState({ saved: [], local: [] });
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
        setSkillForm({ saved: [...r.data.skills], local: [...r.data.skills] });
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <h2>skills</h2>
      {skillForm.local.length > 0 &&
        skillForm.local.map((skill, index) => {
          return (
            <form key={`skill-${skill.id}`}>
              <input
                type="text"
                value={skillForm.local[index].long_name}
                // className={
                //   skillForm[index].long_name === skills[index].long_name
                //     ? "unchanged"
                //     : "changed"
                // }
                onChange={(e) => {
                  const newSkillForm = { ...skillForm };
                  console.log(newSkillForm.saved[index]);
                  newSkillForm.local[index].long_name = e.target.value;
                  console.log(newSkillForm.saved[index]);
                  setSkillForm({ ...newSkillForm });
                }}
              />
              <p>{skill.short_name}</p>
              <p>{skill.proficiency}</p>
              <p>{skill.logo}</p>
            </form>
          );
        })}
    </>
  );
}
