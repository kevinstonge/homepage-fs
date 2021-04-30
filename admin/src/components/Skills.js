import {axiosWithoutAuth} from "../api/axios.js";
import { useEffect, useState } from "react";
import SkillForm from "./SkillForm.js";
export default function Skills() {
  const [skillForm, setSkillForm] = useState({ saved: [], local: [], buttons: [] });
  useEffect(() => {
    axiosWithoutAuth
      .get(`/api/portfolio/skills`)
      .then((r) => {
        const logoPath = `${process.env.REACT_APP_API}/images`;
        setSkillForm({
          saved:
            [...r.data.skills.map((skill) => {
              return ({
                ...skill,
                localLogo: (skill.logo === null) ? `${logoPath}/defaultLogo.png` : `${logoPath}/${skill.logo}`
              })
            })],
          local: [
            ...r.data.skills.map((skill) => {
              return ({
                ...skill,
                localLogo: (skill.logo === null) ? `${logoPath}/defaultLogo.png` : `${logoPath}/${skill.logo}`
              })
            })
          ],
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
