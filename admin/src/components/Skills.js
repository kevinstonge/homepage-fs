import axios from "axios";
import { useEffect, useState } from "react";
import SkillForm from "./SkillForm.js";
export default function Skills() {
  const [skillForm, setSkillForm] = useState({ saved: [], local: [], buttons: [] });
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
        setSkillForm({
          saved:
            [...r.data.skills.map((skill) => { return ({ ...skill }) })],
          local: [...r.data.skills.map((skill) => { return ({ ...skill }) })],
          buttons: [...r.data.skills.map((skill)=>{return({apply:true,revert:true})})]
        });
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <h2>skills</h2>
      {skillForm.local.length > 0 &&
        skillForm.local.map((skill, index) => {
          return (
            SkillForm({skill, index, skillForm, setSkillForm})
          );
        })}
      <p style={{fontSize:"smaller"}}>*required</p>
    </>
  );
}
